//home page should be here
import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation Bar */}
      <header className="flex justify-between items-center p-6 shadow-md">
        <div className="flex items-center">
          <div className="bg-green-600 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold text-lg">Y</div>
          <nav className="ml-8 space-x-8 text-gray-700 text-md">
            <a href="#" className="hover:text-green-600">Home</a>
            <a href="#" className="hover:text-green-600">FAQ</a>
            <a href="#" className="hover:text-green-600">Contact Us</a>
          </nav>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-md px-4 py-2"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6">
        <h1 className="text-5xl font-bold text-green-700">Feed It Eat It</h1>
        <p className="mt-4 text-xl text-gray-600">An Accessible Way to Healthier Eating & Living</p>

        {/* Why Join Us */}
        <div className="mt-10 text-left max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">Why Join Us?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✔️</span>
              <span><b>Grow your own food easily</b> – No gardening experience needed!</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✔️</span>
              <span><b>Skip the label-reading stress</b> – Know exactly what’s in your meals.</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✔️</span>
              <span><b>Take control</b> – We’ll guide you every step of the way to reap real health benefits.</span>
            </li>
          </ul>

          <div className="text-center mt-8">
            <button className="bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-800">
              JOIN NOW
            </button>
            <p className="text-gray-500 mt-2">Get instant access to a healthier lifestyle!</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What You'll Get:</h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-xl font-bold mb-2">01. Localized Growing Guides</h3>
            <p className="text-gray-600">Learn how to grow produce that thrives in your climate with tailored tips.</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🥑</div>
            <h3 className="text-xl font-bold mb-2">02. Health-First Knowledge</h3>
            <p className="text-gray-600">Discover science-backed benefits of eating fresh produce.</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🍛</div>
            <h3 className="text-xl font-bold mb-2">03. Cultural & Delicious Recipes</h3>
            <p className="text-gray-600">Get inclusive, easy-to-follow recipes aligned with your fresh harvest.</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Plus:</h3>
            <p className="text-gray-600">Seasonal gardening calendars, saving tips, community Q&A, and much more!</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 Feed It Eat It. All rights reserved. | Terms & Conditions | Privacy Policy
      </footer>
    </div>
  );
}
