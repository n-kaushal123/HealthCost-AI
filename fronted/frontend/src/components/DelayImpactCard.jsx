export default function DelayImpactCard({ impactData, monthsDelayed, condition }) {
  if (!impactData) return null;

  const { early_cost, delayed_cost, explanation, currency } = impactData;
  
  const formatCurrency = (amount) => {
    try {
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(amount);
      if (currency === 'NPR') return formatted.replace('NPR', 'NRs');
      return formatted;
    } catch (e) {
      return `${currency} ${amount}`;
    }
  };

  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <h2>Impact of Delaying Care</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
        For chronic conditions like <strong>{condition}</strong>, delaying treatment can significantly increase costs over time.
      </p>
      
      <div className="delay-comparison">
        <div className="delay-stat">
          <h3>Treating Now</h3>
          <p>{formatCurrency(early_cost)}</p>
        </div>
        <div className="delay-stat delayed">
          <h3>Cost if Delayed ({monthsDelayed} mo)</h3>
          <p>{formatCurrency(delayed_cost)}</p>
        </div>
      </div>
      
      <div className="disclaimer" style={{ marginTop: '1.5rem', backgroundColor: '#fffaf0', borderLeftColor: '#ed8936' }}>
        <p style={{ color: '#9c4221' }}>ℹ️ <strong>Why the increase?</strong> {explanation}</p>
      </div>
    </div>
  );
}
