import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/axios";

const AddWorkout = () => {
    const navigate=useNavigate();
  const getToday = () => new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(getToday());
    
  const[exercise,setExercise]=useState("")
  const [sets, setSets] = useState("");
const [reps, setReps] = useState("");
const [weight, setWeight] = useState("");


const handleWorkout = async () => {
    
    if (
      !date ||
      exercise.trim() === "" ||
      sets === "" ||
      reps === ""
    ) {
      alert("Date, exercise, sets and reps are mandatory");
      return; 
    }
  
    
    const payload = {
      date,
      exerciseName: exercise.trim(),
      sets: Number(sets),
      reps: Number(reps),
    };
  
    // weight is optional
    if (weight !== "") {
      payload.weight = Number(weight);
    }
  
    try {
      
      const response = await api.post(
        "/api/workouts",
        payload
      );
  
    
      if (response.status === 201 || response.status === 200) {
        alert(response.data.message || "Workout saved successfully");
        setExercise("");
        setSets("");
        setReps("");
        setWeight("");
      }
  
    } catch (err) {
      
      if (err.response) {
        alert(err.response.data.message || "Something went wrong");
      } else {
        alert("Unable to connect to server");
      }
    }
  };
  

  return (
    <div className="bg-black min-h-screen px-4 py-6 text-white">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add Workout</h1>
      <div className="max-w-sm mx-auto space-y-4">
        <div>
          <label className="block text-gray-400 mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            className="w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Exercise Name</label>
          <input
            type="text"
            value={exercise}
            onChange={(e)=>{
                setExercise(e.target.value)
            }}
            className="w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]"
            placeholder="Enter exercise "
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">sets</label>
          <input
            type="number"
            value={sets}
            onChange={(e)=>{
                setSets(e.target.value)
            }}
            className="w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]"
            placeholder="Enter sets "
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Reps</label>
          <input
            type="number"
            value={reps}
            onChange={(e)=>{
                setReps(e.target.value)
            }}
            className="w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]"
            placeholder="Enter reps "
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e)=>{
                setWeight(e.target.value)
            }}
            className="w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]"
            placeholder="Enter weight "
          />
        </div>

        {/* Actions */}
        <button
        onClick={()=>{
            handleWorkout()
        }}
          className="
    w-full bg-[#004080] hover:bg-[#003366]
    text-white py-2 rounded-lg
    font-medium transition
  "
        >
          Save Exercise
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

export default AddWorkout;
