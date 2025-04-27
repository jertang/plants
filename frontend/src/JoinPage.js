import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";

export default function JoinPage() {
  const [state, setState] = useState("");
  const [climate, setClimate] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state || !climate || !timeCommitment) {
      alert("Please fill out all fields before proceeding!");
      return;
    }
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

        <h2 className="text-center fw-bold mb-2 text-success">Welcome to Plantable!</h2>
        <p className="text-center text-muted mb-4">Let's get you started on your healthy journey!</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <img src={logo} alt="Plantable Logo" style={{ width: "50px", height: "50px", marginRight: "12px" }} />
            <select
              className="form-select"
              style={{ maxWidth: '100%' }}
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">Select your state</option>
              <option value="">Select your state</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">🍕 Climate</label>
            <select
              className="form-select"
              style={{ maxWidth: '100%' }}
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
            >
              <option value="">Select your climate</option>
              <option value="hot">🔥 Hot</option>
              <option value="mild">☄️ Mild</option>
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

          <button
            type="submit"
            className="btn btn-success w-100 rounded-pill fw-bold"
            disabled={!state || !climate || !timeCommitment}
          >
            SAVE
          </button>
        </form>
      </div>
    </div>
  );
}