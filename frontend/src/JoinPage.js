
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinPage() {
  const [state, setState] = useState("");
  const [climate, setClimate] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard', { state: { state, climate, timeCommitment } });
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-4">
          <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
               style={{ width: '50px', height: '50px', fontSize: '20px', fontWeight: 'bold' }}>
            Y
          </div>
        </div>

        <h2 className="text-center fw-bold mb-2 text-success">Welcome to Feed It Eat It!</h2>
        <p className="text-center text-muted mb-4">Let's get you started on your healthy journey!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">🌱 State</label>
            <select
              className="form-select"
              style={{ maxWidth: '100%' }}
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select your state</option>
              <option value="CA">California</option>
              <option value="NY">New York</option>
              <option value="TX">Texas</option>
              <option value="WA">Washington</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">🍅 Climate</label>
            <select
              className="form-select"
              style={{ maxWidth: '100%' }}
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
            >
              <option value="">Select your climate</option>
              <option value="hot">🔥 Hot</option>
              <option value="mild">🌤️ Mild</option>
              <option value="cold">❄️ Cold</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">🕒 Time Commitment</label>
            <select
              className="form-select"
              style={{ maxWidth: '100%' }}
              value={timeCommitment}
              onChange={(e) => setTimeCommitment(e.target.value)}
            >
              <option value="">Select dedication level 🕒🕒🕒</option>
              <option value="low">🕒 Low</option>
              <option value="medium">🕒🕒 Medium</option>
              <option value="high">🕒🕒🕒 High</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-pill fw-bold">
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}
