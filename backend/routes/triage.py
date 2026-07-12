from fastapi import APIRouter
from models import TriageRequest, TriageResponse
import json
import os

router = APIRouter()

# Load symptom rules
DATA_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "symptom_rules.json")
with open(DATA_FILE, "r") as f:
    symptom_rules = json.load(f)

@router.post("/triage", response_model=TriageResponse)
def triage(request: TriageRequest):
    symptoms = request.symptoms.lower()
    
    # Check for ER symptoms
    for kw in symptom_rules.get("er", []):
        if kw in symptoms:
            return TriageResponse(urgency="er", reason=f"Detected critical symptom keyword: '{kw}'. Please seek emergency care immediately.")
            
    # Check for Clinic symptoms
    for kw in symptom_rules.get("clinic", []):
        if kw in symptoms:
            return TriageResponse(urgency="clinic", reason=f"Detected symptom '{kw}' which generally requires a clinic visit.")
            
    # If duration is long or age is high with some symptoms, we might escalate, but for MVP keep it simple
    if request.duration_days > 7 and request.age > 65:
        return TriageResponse(urgency="clinic", reason="Prolonged symptoms in older adults often warrant a clinic checkup.")
        
    # Default to self care if no severe keywords found
    return TriageResponse(urgency="self_care", reason="No severe symptoms detected. Monitor your condition and use over-the-counter remedies if appropriate.")
