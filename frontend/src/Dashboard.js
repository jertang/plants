
import React,{ useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const location = useLocation();
  const {name, state, climate, timeCommitment } = location.state || {};


  const [summary, setSummary] = useState("");
  const [crops, setCrops] = useState([]);
  const [recipes, setRecipes] = useState({});


  const healthBenefits = {
    hot: [
      "Tomatoes: Supports heart health",
      "Peppers: Boosts metabolism"
    ],
    mild: [
      "Spinach: Boosts brain function",
      "Broccoli: Strengthens immunity"
    ],
    cold: [
      "Kale: Rich in iron",
      "Carrots: Improves vision"
    ]
  };



  
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Get recommendations from flask
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

        const cropNames = response.data.recommendations.map(crop => crop.name);

        if (cropNames.length > 0) {
          // Second: Fetch recipes for these crops
          const recipesResponse = await axios.post("http://localhost:5000/get_recipes", {
            crops: cropNames,
          });

          setRecipes(recipesResponse.data);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };
    if (name && state && climate && timeCommitment) {
      fetchData();
    }

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
                  <div className="card shadow-sm p-3 text-center h-100">
                    <h5 className="fw-bold">{crop.name}</h5>
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
    {crops.length > 0 ? (
      crops.map((crop, index) => (
        <div key={index} className="col-md-12 mb-4">
          <h4 className="fw-bold text-success mb-3">{crop.name} Recipes</h4>
          <div className="row g-3">
            {recipes[crop.name]?.map((recipe, rIndex) => (
              <div className="col-md-4" key={rIndex}>
                <div
                  className="card shadow-sm p-3 text-center h-100"
                  onClick={() => window.open(recipe.url, "_blank")}
                  style={{ cursor: "pointer" }}
                >
                  <h5 className="fw-bold">{recipe.title}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p>No recipes available.</p>
    )}
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