from fastapi import APIRouter, HTTPException
from models import CostRequest, CostResponse, CostRange, CostBreakdown
import json
import os

router = APIRouter()

@router.post("/cost", response_model=CostResponse)
def get_cost(request: CostRequest):
    DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "costs_by_region.json")
    with open(DATA_FILE, "r") as f:
        costs_by_region = json.load(f)

    RATES_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "country_rates.json")
    with open(RATES_FILE, "r") as f:
        country_rates = json.load(f)

    region_data = costs_by_region.get(request.region.lower())
    if not region_data:
        region_data = costs_by_region.get("urban")
        
    urgency_data = region_data.get(request.urgency.lower())
    if not urgency_data:
        raise HTTPException(status_code=400, detail="Invalid urgency level")
        
    country_key = request.country.lower()
    conversion = country_rates.get(country_key, {"currency": "USD", "rate": 1.0})
    rate = conversion["rate"]
    currency = conversion["currency"]
        
    consultation = CostRange(
        min=round(urgency_data["consultation"]["min"] * rate),
        max=round(urgency_data["consultation"]["max"] * rate),
        currency=currency
    )
    tests = CostRange(
        min=round(urgency_data["tests"]["min"] * rate),
        max=round(urgency_data["tests"]["max"] * rate),
        currency=currency
    )
    medicine = CostRange(
        min=round(urgency_data["medicine"]["min"] * rate),
        max=round(urgency_data["medicine"]["max"] * rate),
        currency=currency
    )
    
    total_min = consultation.min + tests.min + medicine.min
    total_max = consultation.max + tests.max + medicine.max
    
    return CostResponse(
        cost_range=CostRange(min=total_min, max=total_max, currency=currency),
        breakdown=CostBreakdown(
            consultation=consultation,
            tests=tests,
            medicine=medicine
        )
    )
