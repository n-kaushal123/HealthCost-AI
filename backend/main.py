from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.triage import router as triage_router
from routes.cost import router as cost_router
from routes.delay import router as delay_router

app = FastAPI(title="HealthCost AI", description="Smart Care & Cost Navigator API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(triage_router, tags=["Triage"])
app.include_router(cost_router, tags=["Cost"])
app.include_router(delay_router, tags=["Delay Impact"])

@app.get("/")
def read_root():
    return {"message": "HealthCost AI API is running....."}

if __name__ == "__main__":
    import uvicorn
    import os
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
