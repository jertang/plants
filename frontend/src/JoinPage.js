import React, { useState } from "react";

export default function JoinPage() {
  const [state, setState] = useState("");
  const [climate, setClimate] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans p-8 flex flex-col items-center relative overflow-hidden">
      {/* Background Decorations (optional: using absolutely positioned images for the fruits/veggies) */}

      {/* Main Content */}
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full z-10">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">Y</div>
        </div>
        <h1 className="text-3xl font-bold text-green-800 text-center mb-2">We’re so happy you’re here!</h1>
        <p className="text-center text-gray-600 mb-8">Now let’s get the seeds planted...</p>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* State Field */}
          <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm">
            <span className="text-2xl mr-3">🌿</span>
            <input
              type="text"
              placeholder="What State do you live in?"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full focus:outline-none"
            />
          </div>

          {/* Climate Field */}
          <div className="flex items-center p-4 border rounded-lg bg-white shadow-sm">
            <span className="text-2xl mr-3">🍅</span>
            <input
              type="text"
              placeholder="What's the climate like"
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              className="w-full focus:outline-none"
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
              className="w-full p-4 border rounded-lg bg-white shadow-sm focus:outline-none"
            >
              <option value="">Drop'own 🌱 🌱🌱 🌱🌱🌱</option>
              <option value="low">🌱 Low</option>
              <option value="medium"> 🌱🌱 Medium</option>
              <option value="high"> 🌱🌱🌱 High</option>
            </select>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-green-800 text-white py-3 rounded-lg font-bold text-lg mt-8 hover:bg-green-900">
          SAVE
        </button>
      </div>
    </div>
  );
}
