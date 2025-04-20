"use client";
import React, { useState } from "react";
import axios from "axios";

function Form() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  async function Output() {
    try {
      setLoading(true);
      const res = await axios.post("https://d9c9-104-199-123-185.ngrok-free.app/query", {
        height: height,
        weight: weight,
        goal: goal,
      });
      setOutput(res.data.diet_plan || "No response received");
    } catch (error) {
      setOutput("Error fetching the diet plan. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <h1 className="text-2xl font-bold mb-4 bg-gradient-to-tr text-transparent from-orange-300 to-orange-500 bg-clip-text">Diet Plan Generator</h1>

      {!loading && output === "" ? (
        <div className="bg-gray-700 shadow-md rounded-lg p-6 w-full max-w-md">
          <div className="mb-4">
            <label className="block  font-medium mb-2">Height (in cm)</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your height"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Weight (in kg)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border text-black  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your weight"
            />
          </div>

          <div className="mb-6">
            <label className="block text-white font-medium mb-2">Goal</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="E.g., weight loss, weight gain"
            />
          </div>

          <button
            onClick={Output}
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Generate Plan
          </button>
        </div>
      ) : loading ? (
        <div className="text-gray-700 font-medium text-lg">Loading...</div>
      ) : (
        <div className=" shadow-md rounded-lg p-6 w-full max-w-md ">
          <h2 className="text-xl font-bold mb-4">Your Diet Plan</h2>
          <p className="whitespace-pre-wrap">{output}</p>
          <button
            onClick={() => {
              setHeight("");
              setWeight("");
              setGoal("");
              setOutput("");
            }}
            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Generate Another Plan
          </button>
        </div>
      )}
    </div>
  );
}

export default Form;
