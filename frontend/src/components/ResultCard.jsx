export default function ResultCard({ triage, cost }) {
  if (!triage || !cost) return null;

  const { urgency, reason } = triage;
  const { cost_range, breakdown } = cost;
  
  const formatCurrency = (amount, currency) => {
    try {
      const formatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: currency, maximumFractionDigits: 0 }).format(amount);
      if (currency === 'NPR') return formatted.replace('NPR', 'NRs');
      return formatted;
    } catch (e) {
      return `${currency} ${amount}`;
    }
  };

  const getUrgencyDisplay = (u) => {
    switch(u) {
      case 'er': return 'Emergency Room';
      case 'clinic': return 'Clinic Visit';
      case 'self_care': return 'Self Care';
      default: return u;
    }
  };

  return (
    <div className="card">
      <h2>Assessment Results</h2>
      
      <div>
        <span className={`urgency-badge urgency-${urgency}`}>
          {getUrgencyDisplay(urgency)}
        </span>
        <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>{reason}</p>
      </div>

      <h3>Estimated Care Costs</h3>
      <div style={{ marginTop: '1rem' }}>
        <div className="cost-row">
          <span>Consultation</span>
          <span>{formatCurrency(breakdown.consultation.min, breakdown.consultation.currency)} - {formatCurrency(breakdown.consultation.max, breakdown.consultation.currency)}</span>
        </div>
        <div className="cost-row">
          <span>Tests/Imaging</span>
          <span>{formatCurrency(breakdown.tests.min, breakdown.tests.currency)} - {formatCurrency(breakdown.tests.max, breakdown.tests.currency)}</span>
        </div>
        <div className="cost-row">
          <span>Medicine/Treatment</span>
          <span>{formatCurrency(breakdown.medicine.min, breakdown.medicine.currency)} - {formatCurrency(breakdown.medicine.max, breakdown.medicine.currency)}</span>
        </div>
        
        <div className="cost-row cost-total">
          <span>Total Estimated Range</span>
          <span>{formatCurrency(cost_range.min, cost_range.currency)} - {formatCurrency(cost_range.max, cost_range.currency)}</span>
        </div>
      </div>
    </div>
  );
}
