"use client";
import React, { useState } from "react";
import WorkoutSchedule from "./Plan";
interface FormData {
  age: string;
  sex: string;
  height: string; // height in feet (entered by the user)
  weight: string;
  goal: string;
  targetWeight: string;
  experience: string;
}


function Form() {

  

  const [response, setResponse] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    age: "",
    sex: "",
    height: "",
    weight: "",
    goal: "",
    targetWeight: "",
    experience: ""
  });

  const [errors, setErrors] = useState({
    height: "",
    weight: "",
    targetWeight: ""
  });

  const validateHeight = (value: string): boolean => {
    const heightNum = parseFloat(value);
    if (value && (isNaN(heightNum) || heightNum < 4 || heightNum > 6.5)) {
      setErrors((prev) => ({
        ...prev,
        height: "Please enter a reasonable height (4-6.5 ft)"
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, height: "" }));
    return true;
  };

  const validateWeight = (value: string): boolean => {
    const weightNum = parseFloat(value);
    if (value && (isNaN(weightNum) || weightNum < 40 || weightNum > 110)) {
      setErrors((prev) => ({
        ...prev,
        weight: "Please enter a reasonable weight (40-110 kgs)"
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, weight: "" }));
    return true;
  };

  const validateTargetWeight = (): boolean => {
    const weightNum = parseFloat(formData.weight);
    const targetWeightNum = parseFloat(formData.targetWeight);

    if (formData.goal === "weight loss" && targetWeightNum >= weightNum) {
      setErrors((prev) => ({
        ...prev,
        targetWeight: "For weight loss, target weight must be less than current weight"
      }));
      return false;
    }
    if (Math.abs( targetWeightNum -weightNum) < 25) {
      setErrors((prev) => ({
        ...prev,
        targetWeight: "Caution: The difference between target and current should be less than 25"
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, targetWeight: "" }));
    return true;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "height") validateHeight(value);
    if (field === "weight") validateWeight(value);
    if (field === "goal" || field === "targetWeight" || field === "weight") validateTargetWeight();
  };

  // Convert height from feet to centimeters
  const feetToCm = (feet: string) => {
    const feetNum = parseFloat(feet);
    return isNaN(feetNum) ? 0 : feetNum * 30.48; // 1 foot = 30.48 cm
  };

  const generateWorkoutPlan = async () => {

    const heightInCm = feetToCm(formData.height);

    try {
      console.log("Generating Workout Plan...");
      const res = await fetch("https://keen-marten-tops.ngrok-free.app/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          age: formData.age,
          sex: formData.sex,
          height: heightInCm, // Send height in cm
          weight: formData.weight,
          goal: formData.goal,
          target_weight: formData.targetWeight,
          experience: formData.experience
        })
      });

      const data = await res.json();
      const responseText = data.output.substring(data.output.indexOf("Response") || 0);
      setShowForm(false);
      setResponse(responseText);
      console.log(responseText);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse("An error occurred while generating your workout plan. Please try again.");
    }
  };

  const inputClasses =
    "w-full rounded-lg bg-transparent border border-orange-400 h-12 px-4 text-white placeholder:text-white/45";
  const selectClasses =
    "w-full h-12 px-4 rounded-lg border border-orange-400 bg-transparent text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-400";
  const labelClasses = "text-sm font-medium text-white";

  return (
    <section className="p-4">
      {showForm ? (
        <div className="container max-w-[900px] bg-gradient-to-br from-orange-400 to-orange-600 p-1 rounded-lg mx-auto">
          <div className="flex flex-col gap-6 p-8 bg-black rounded-lg">
            <div className="flex flex-col gap-6 w-full">
              <div className="flex gap-6 flex-col md:flex-row">
                <div className="flex flex-col gap-2 flex-1">
                  <label className={labelClasses}>Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange("age")}
                    className={inputClasses}
                    placeholder="Enter age"
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className={labelClasses}>Sex</label>
                  <select
                    value={formData.sex}
                    onChange={handleInputChange("sex")}
                    className={selectClasses}
                  >
                    <option value="" className="bg-black" disabled>
                      Select sex
                    </option>
                    <option value="male" className="bg-black">
                      Male
                    </option>
                    <option value="female" className="bg-black">
                      Female
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClasses}>Height (ft)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={handleInputChange("height")}
                  className={inputClasses}
                  placeholder="Enter height in feet (e.g. 5.8)"
                />
                {errors.height && (
                  <span className="text-orange-500 text-sm">{errors.height}</span>
                )}
              </div>

              <div className="flex gap-6 flex-col md:flex-row">
                <div className="flex flex-col gap-2 flex-1">
                  <label className={labelClasses}>Goal</label>
                  <select
                    value={formData.goal}
                    onChange={handleInputChange("goal")}
                    className={selectClasses}
                  >
                    <option value="" className="bg-black" disabled>
                      Select Goal
                    </option>
                    <option value="weight loss" className="bg-black">
                      Weight Loss
                    </option>
                    <option value="muscle gain" className="bg-black">
                      Muscle Gain
                    </option>
                    <option value="health" className="bg-black">
                      Health
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label className={labelClasses}>Weight (kgs)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={handleInputChange("weight")}
                    className={inputClasses}
                    placeholder="Enter current weight"
                  />
                  {errors.weight && (
                    <span className="text-orange-500 text-sm">{errors.weight}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClasses}>Experience</label>
                <select
                  value={formData.experience}
                  onChange={handleInputChange("experience")}
                  className={selectClasses}
                >
                  <option value="" className="bg-black" disabled>
                    Select Gym Experience
                  </option>
                  <option value="beginner" className="bg-black">
                    Beginner
                  </option>
                  <option value="intermediate" className="bg-black">
                    Intermediate
                  </option>
                  <option value="advanced" className="bg-black">
                    Advanced
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className={labelClasses}>Target Weight (kgs)</label>
                <input
                  type="number"
                  value={formData.targetWeight}
                  onChange={handleInputChange("targetWeight")}
                  className={inputClasses}
                  placeholder="Enter target weight"
                />
                {errors.targetWeight && (
                  <span className="text-orange-500 text-sm">{errors.targetWeight}</span>
                )}
              </div>

              <button
                onClick={generateWorkoutPlan}
                className="bg-orange-600 text-white py-2 rounded-lg w-full"
              >
                Generate Workout Plan
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[900px] mx-auto bg-black rounded-lg p-6 text-white">
          
          <WorkoutSchedule rawWorkoutString={response} />
        </div>
      )}
    </section>
  );
}

export default Form;
