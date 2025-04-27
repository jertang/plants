
import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const location = useLocation();
  const {name, state, climate, timeCommitment } = location.state || {};

  const [summary, setSummary] = useState("");
  const [crops, setCrops] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/submitinfo", {
          name,
          state,
          climate,
          timeCommitment,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setSummary(response.data["LLM summary"]);
        setCrops(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };
  
    fetchData();
  }, [name, state, climate, timeCommitment]);


  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold text-success mb-4">Here's what you can grow and enjoy!</h1>
      <p className="text-center text-muted mb-5">
      {summary ? summary : "Loading summary..."}
    </p>

      <section className="mb-5">
        <h2 className="fw-bold mb-4">🌱 Recommended Crops for You</h2>
        <div className="row g-3">
                {crops.length > 0 ? (
          [...Array(Math.ceil(crops.length / 4))].map((_, rowIndex) => (
            <div className="row g-3 mb-3" key={rowIndex}>
              {crops.slice(rowIndex * 4, rowIndex * 4 + 4).map((crop, index) => (
                <div className="col-md-3" key={index}>
                  <div 
                    className="card shadow-sm p-3 text-center h-100 position-relative"
                    style={{ cursor: "pointer" }}
                  >
                    <h5 className="fw-bold">{crop.name}</h5>
                    {/* Hidden popup box that appears on hover */}
                    <div
                      className="crop-info-popup position-absolute bg-white p-3 rounded shadow"
                      style={{
                        top: "50%",
                        left: "105%",
                        transform: "translateY(-50%)",
                        minWidth: "220px",
                        display: "none",
                        zIndex: 10,
                        textAlign: "left",
                        fontSize: "0.9rem"
                      }}
                    >
                      <p className="mb-2"><strong>Climate:</strong> {crop.climate}</p>
                      <p className="mb-2"><strong>Days to Grow:</strong> {crop.days}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No crops available for your selection.</p>
        )}
        </div>
      </section>

      <section className="mb-5">
        <h2 className="fw-bold mb-4">🍲 Recipe Ideas</h2>
        <div className="row g-3">
          {recipeIdeas[climate]?.map((recipe, index) => (
            <div className="col-md-6" key={index}>
              <div className="card shadow-sm p-3 text-center h-100">
                <h5 className="fw-bold">{recipe}</h5>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="fw-bold mb-4">🥦 Nutritional Benefits</h2>
        <ul className="list-group">
          {healthBenefits[climate]?.map((benefit, index) => (
            <li key={index} className="list-group-item">
              {benefit}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}