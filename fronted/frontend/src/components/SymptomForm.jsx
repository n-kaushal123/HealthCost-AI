import { useState } from 'react';

export default function SymptomForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    symptoms: '',
    age: '',
    gender: 'prefer_not_to_say',
    country: 'united states',
    duration_days: '',
    region: 'urban',
    condition: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: parseInt(formData.age, 10),
      duration_days: parseInt(formData.duration_days, 10)
    });
  };

  return (
    <div className="card">
      <h2>Enter Your Symptoms</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="symptoms">Symptoms</label>
          <input
            type="text"
            id="symptoms"
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            placeholder="e.g., fever, cough, chest pain"
            required
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px' }}>
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          
          <div className="form-group" style={{ flex: '1 1 200px' }}>
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          
          <div className="form-group" style={{ flex: '1 1 200px' }}>
            <label htmlFor="duration_days">Duration (Days)</label>
            <input
              type="number"
              id="duration_days"
              name="duration_days"
              value={formData.duration_days}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 200px' }}>
            <label htmlFor="country">Country</label>
            <select id="country" name="country" value={formData.country} onChange={handleChange}>
              <optgroup label="America">
                <option value="united states">United States</option>
                <option value="canada">Canada</option>
                <option value="mexico">Mexico</option>
                <option value="brazil">Brazil</option>
                <option value="argentina">Argentina</option>
              </optgroup>
              <optgroup label="Europe">
                <option value="united kingdom">United Kingdom</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
                <option value="italy">Italy</option>
                <option value="spain">Spain</option>
              </optgroup>
              <optgroup label="Asia">
                <option value="india">India</option>
                <option value="japan">Japan</option>
                <option value="china">China</option>
                <option value="south korea">South Korea</option>
                <option value="thailand">Thailand</option>
                <option value="nepal">Nepal</option>
              </optgroup>
              <optgroup label="Africa">
                <option value="south africa">South Africa</option>
                <option value="nigeria">Nigeria</option>
                <option value="kenya">Kenya</option>
                <option value="egypt">Egypt</option>
                <option value="morocco">Morocco</option>
              </optgroup>
            </select>
          </div>

          <div className="form-group" style={{ flex: '1 1 200px' }}>
            <label htmlFor="region">Area Type</label>
            <select id="region" name="region" value={formData.region} onChange={handleChange}>
              <option value="urban">Urban</option>
              <option value="semi-urban">Semi-Urban</option>
              <option value="rural">Rural</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="condition">Chronic Condition (Optional)</label>
          <select id="condition" name="condition" value={formData.condition} onChange={handleChange}>
            <option value="">None</option>
            <option value="diabetes">Diabetes</option>
            <option value="hypertension">Hypertension</option>
          </select>
        </div>

        <button type="submit" className="btn" disabled={isLoading}>
          {isLoading ? 'Analyzing...' : 'Get Guidance'}
        </button>
      </form>
    </div>
  );
}
