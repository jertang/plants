import React, { useState } from "react";

export default function JoinPage() {
  const [state, setState] = useState("");
  const [climate, setClimate] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 font-sans p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Main Card */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full z-10 animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="bg-accent text-white rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg">
            Y
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-primary text-center mb-2">
          We’re so happy you’re here!
        </h1>
        <p className="text-center text-muted mb-8">
          Now let’s get the seeds planted...
        </p>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* State Field */}
          <div className="flex items-center p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
            <span className="text-2xl mr-3">🌿</span>
            <input
              type="text"
              placeholder="What State do you live in?"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>

          {/* Climate Field */}
          <div className="flex items-center p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition">
            <span className="text-2xl mr-3">🍅</span>
            <input
              type="text"
              placeholder="What's the climate like?"
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full bg-transparent focus:outline-none text-gray-700"
            />
          </div>

          {/* Time Commitment Dropdown */}
          <div>
            <label className="block mb-2 text-gray-700 font-semibold">
              How much time to dedicate to your garden
            </label>
            <select
              value={timeCommitment}
              onChange={(e) => setTimeCommitment(e.target.value)}
              className="w-full p-4 border rounded-lg bg-gray-50 shadow-sm focus:outline-none hover:shadow-md transition"
            >
              <option value="">Dropdown 🌱 🌱🌱 🌱🌱🌱</option>
              <option value="low">🌱 Low</option>
              <option value="medium">🌱🌱 Medium</option>
              <option value="high">🌱🌱🌱 High</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-accent text-white py-3 rounded-lg font-bold text-lg mt-8 transform transition hover:scale-105 hover:bg-secondary">
          SAVE
        </button>
      </div>
    </div>
  );
}

