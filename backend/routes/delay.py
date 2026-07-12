from fastapi import APIRouter, HTTPException
from models import DelayImpactRequest, DelayImpactResponse
import json
import os

router = APIRouter()

@router.post("/delay-impact", response_model=DelayImpactResponse)
def get_delay_impact(request: DelayImpactRequest):
    DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "delay_multipliers.json")
    with open(DATA_FILE, "r") as f:
        delay_data = json.load(f)

    RATES_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "country_rates.json")
    with open(RATES_FILE, "r") as f:
        country_rates = json.load(f)

    condition_key = request.condition.lower()
    
    info = delay_data.get(condition_key)
    if not info:
        info = {
            "base_early_cost": 100,
            "delay_multiplier_per_month": 1.05,
            "explanation": "Delaying medical care generally compounds the costs due to worsening of the condition over time."
        }
        
    country_key = request.country.lower()
    conversion = country_rates.get(country_key, {"currency": "USD", "rate": 1.0})
    rate = conversion["rate"]
    currency = conversion["currency"]
    
    early_cost = info["base_early_cost"] * rate
    delayed_cost = early_cost * (info["delay_multiplier_per_month"] ** request.months_delayed)
    
    return DelayImpactResponse(
        early_cost=round(early_cost, 2),
        delayed_cost=round(delayed_cost, 2),
        currency=currency,
        explanation=info["explanation"]
    )
