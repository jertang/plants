import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png"; 
import gardenimage from "./images/gardening.jpg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container d-flex justify-content-between">
          <div className="d-flex align-items-center gap-4">
            {/* Logo properly loaded */}
            <a href="/">
              <img src={logo} alt="Plantable Logo" style={{ width: "50px", height: "50px" }} />
            </a>
            <a className="nav-link" href="#">FAQ</a>
            <a className="nav-link" href="#">Contact Us</a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background */}
      <section
        className="text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${gardenimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "70vh",
          color: "white",
          textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
          flexDirection: "column",
          padding: "2rem"
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Feed It Eat It</h1>
          <p className="lead">An Accessible Way to Healthier Eating & Living</p>

          {/* Why Join Us */}
          <div className="mt-5">
            <h2 className="fw-bold mb-4">Why Join Us?</h2>
            <ul className="list-unstyled">
              <li className="mb-3"><span className="text-success me-2">✔️</span> <b>Grow your own food easily</b> – No gardening experience needed!</li>
              <li className="mb-3"><span className="text-success me-2">✔️</span> <b>Skip the label-reading stress</b> – Know exactly what’s in your meals</li>
              <li className="mb-3"><span className="text-success me-2">✔️</span> <b>Take control</b> – We’ll guide you every step of the way so you can reap real, lasting health benefits.</li>
            </ul>

            <button
              className="btn btn-success btn-lg rounded-pill px-5 mt-4"
              onClick={() => navigate('/join')}
            >
              JOIN NOW
            </button>
            <p className="mt-3">Get instant access to a healthier lifestyle!</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="fw-bold text-center mb-5">What You'll Get:</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="d-flex align-items-start mb-4">
                <div className="border rounded p-2 me-3" style={{width: "40px"}}><b>01</b></div>
                <div>
                  <h5 className="fw-bold">Localized Growing Guides 🌱</h5>
                  <p>Learn how to grow produce that thrives in your climate with tailored tips based on your resources.</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-4">
                <div className="border rounded p-2 me-3" style={{width: "40px"}}><b>02</b></div>
                <div>
                  <h5 className="fw-bold">Health-First Knowledge 🥑</h5>
                  <p>Discover the science-backed benefits of incorporating fresh produce into your meals.</p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-4">
                <div className="border rounded p-2 me-3" style={{width: "40px"}}><b>03</b></div>
                <div>
                  <h5 className="fw-bold">Cultural & Delicious Recipes 🍲</h5>
                  <p>Get culturally inclusive, easy-to-follow recipes aligned with your fresh harvest.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4 className="fw-bold mb-3">Plus:</h4>
              <ul className="list-unstyled">
                <li className="mb-2">🎉 Seasonal gardening calendars</li>
                <li className="mb-2">🎉 Tips for saving money while eating fresh</li>
                <li className="mb-2">🎉 Community support and live Q&A sessions</li>
                <li className="mb-2"><b>🎉 And SO MUCH MORE!</b></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-muted py-4">
        © 2025 Feed It Eat It. All rights reserved.
      </footer>
    </div>
  );
}
