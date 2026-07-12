import { useState } from "react";
import Disclaimer from "./components/Disclaimer";
import SymptomForm from "./components/SymptomForm";
import ResultCard from "./components/ResultCard";
import DelayImpactCard from "./components/DelayImpactCard";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // 1. Get Triage
      const triageRes = await fetch(`${API_BASE}/triage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symptoms: formData.symptoms,
          gender: formData.gender,
          age: formData.age,
          duration_days: formData.duration_days,
        }),
      });

      if (!triageRes.ok) throw new Error("Failed to get triage assessment");
      const triageData = await triageRes.json();

      // 2. Get Cost based on triage result
      const costRes = await fetch(`${API_BASE}/cost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          urgency: triageData.urgency,
          region: formData.region,
          country: formData.country,
          condition_type: formData.condition || null,
        }),
      });

      if (!costRes.ok) throw new Error("Failed to get cost estimation");
      const costData = await costRes.json();

      // 3. Get Delay Impact if chronic condition is selected
      let delayData = null;
      if (formData.condition) {
        const delayRes = await fetch(`${API_BASE}/delay-impact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            condition: formData.condition,
            country: formData.country,
            months_delayed: 6, // Hardcoded 6 months for illustrative MVP
          }),
        });

        if (delayRes.ok) {
          delayData = await delayRes.json();
        }
      }

      setResults({
        triage: triageData,
        cost: costData,
        delayImpact: delayData,
        condition: formData.condition,
        monthsDelayed: 6,
      });
    } catch (err) {
      setError(
        err.message || "An unexpected error occurred. Is the backend running?",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>HealthCost AI</h1>
        <p>Smart Care & Cost Navigator</p>
      </header>

      <Disclaimer />

      <SymptomForm onSubmit={handleAnalyze} isLoading={loading} />

      {error && (
        <div
          className="disclaimer"
          style={{ backgroundColor: "#fff5f5", borderLeftColor: "#e53e3e" }}
        >
          <p style={{ color: "#c53030" }}>{error}</p>
        </div>
      )}

      {results && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          <ResultCard triage={results.triage} cost={results.cost} />
          {results.delayImpact && (
            <DelayImpactCard
              impactData={results.delayImpact}
              condition={results.condition}
              monthsDelayed={results.monthsDelayed}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
