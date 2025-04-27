
import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const location = useLocation();
  const { state, climate, timeCommitment } = location.state || {};


  const [summary, setSummary] = useState("");
  const [crops, setCrops] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/submitinfo", {
          state,
          climate,
          timeCommitment,
        });
  
        setSummary(response.data["LLM summary"]);
        setCrops(response.data.recommendations);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };
  
    fetchData();
  }, [state, climate, timeCommitment]);

  /*
  const cropRecommendations = {
    hot: ["Tomatoes", "Peppers", "Basil", "Okra"],
    mild: ["Spinach", "Lettuce", "Broccoli", "Peas"],
    cold: ["Kale", "Cabbage", "Carrots", "Beets"]
  };
  */
  const recipeIdeas = {
    hot: ["Fresh Tomato Salad", "Spicy Pepper Stir Fry"],
    mild: ["Spinach Smoothie", "Broccoli Rice Bowl"],
    cold: ["Hearty Kale Soup", "Roasted Root Vegetables"]
  };

  const healthBenefits = {
    hot: ["Tomatoes: ❤️ Supports heart health", "Peppers: 🔥 Boosts metabolism"],
    mild: ["Spinach: 🧠 Boosts brain function", "Broccoli: 🛡️ Strengthens immunity"],
    cold: ["Kale: 💪 Rich in iron", "Carrots: 👀 Improves vision"]
  };

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
          crops.slice(0, 4).map((crop, index) => (
            <div className="col-md-3" key={index}>
              <div className="card shadow-sm p-3 text-center h-100">
                <h5 className="fw-bold">{crop.name}</h5>
              </div>
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