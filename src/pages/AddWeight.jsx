import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/axios";


const AddWeight = () => {
  const navigate = useNavigate();

  const getToday = () => new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(getToday());
  const [weight, setWeight] = useState("");

  const handleWeight = async () => {
    
    try {
      
      if (!date || weight == null) {
        alert("Date and weight are mandatory");
        return;
      }
  
     
      const response = await api.post(
        "/api/weights",
        {
          date: date,
          weight: weight,
        }
      );
       
      if (response.status === 201 || response.status === 200) {
        alert(response.data.message || "Weight saved successfully");
        navigate(-1);
      }
  
    } catch (err) {
      
      if (err.response) {
        // Backend error (400 / 500)
        alert(err.response.data.message || "Something went wrong");
      } else {
        // Network / server down
        alert("Unable to connect to server");
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add Weight</h1>

      <div className="max-w-sm mx-auto space-y-4">
        {/* Date */}
        <div>
          <label className="block text-gray-400 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
      w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]
    "
          />
        </div>

        {/* Weight */}
        <div>
          <label className="block text-gray-400 mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            className="
      w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]
    "
          />
        </div>

        {/* Actions */}
        <button
        onClick={()=>{
            handleWeight()
        }}
          className="
    w-full bg-[#004080] hover:bg-[#003366]
    text-white py-2 rounded-lg
    font-medium transition
  "
        >
          Save Weight
        </button>

        <button
          onClick={() => navigate(-1)}
          className="
    w-full mt-2
    border border-gray-700
    text-gray-300
    py-2 rounded-lg
    hover:bg-gray-800
    transition
  "
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default AddWeight;
