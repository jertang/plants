
import React from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const { state, climate, timeCommitment } = location.state || {};

  const cropRecommendations = {
    hot: ["Tomatoes", "Peppers", "Basil", "Okra"],
    mild: ["Spinach", "Lettuce", "Broccoli", "Peas"],
    cold: ["Kale", "Cabbage", "Carrots", "Beets"]
  };

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
      <p className="text-center text-muted mb-5">Based on your state and climate selection</p>

      <section className="mb-5">
        <h2 className="fw-bold mb-4">🌱 Recommended Crops for You</h2>
        <div className="row g-3">
          {cropRecommendations[climate]?.map((crop, index) => (
            <div className="col-md-3" key={index}>
              <div className="card shadow-sm p-3 text-center h-100">
                <h5 className="fw-bold">{crop}</h5>
              </div>
            </div>
          ))}
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