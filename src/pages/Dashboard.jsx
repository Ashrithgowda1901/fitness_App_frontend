import Button from "../components/Button";
import NutritionSummary from "../components/NutritionSummary";
import Weight from "../components/Weight";
import WorkoutSummary from "../components/WorkoutSummary";
import { Plus } from "lucide-react";
import Log from "../components/Log";
import api from "../service/axios";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "../components/Logout";

import { useEffect, useState, useContext } from "react";

const Dashboard = () => {
  const getDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const { user, loading } = useContext(AuthContext);

  const [isLogOpen, setIsLogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getDate());
  const [weight, setWeight] = useState(null);
  const [workout, setWorkout] = useState(null);
  const [nutritionEntries, setNutritionEntries] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);

  useEffect(() => {
    const fetchWeight = async () => {
      try {
        const response = await api.get(
          `/api/weights?date=${selectedDate}`    
        );

        setWeight(response.data?.weight ?? null);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
        setWeight(null);
      }
    };

    const fetchWorkout = async () => {
      try {
        const response = await api.get(
          `/api/workouts?date=${selectedDate}`
        );

        setWorkout(response.data || []);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
        setWorkout([]);
      }
    };

    const fetchNutrition = async () => {
      try {
        const response = await api.get(
          `/api/nutritionLogs?date=${selectedDate}`      
        );

        setNutritionEntries(response.data.entries || []);
        setTotalCalories(response.data.totalCalories || 0);
        setTotalProtein(response.data.totalProtein || 0);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
        setNutritionEntries([]);
        setTotalCalories(0);
        setTotalProtein(0);
      }
    };

    fetchWeight();
    fetchWorkout();
    fetchNutrition();
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-6 text-white">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-semibold tracking-wide">Dashboard</h1>

          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold tracking-wide text-gray-300">
              Welcome,{" "}
              <span className="text-white">
                {user?.firstName} {user?.lastName}
              </span>
            </h1>
            <LogoutButton />
          </div>
        </div>

        {/* Date Picker */}
        <div className="mt-3 flex justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
            className="
              bg-neutral-900
              border border-gray-800
              rounded-md
              px-3 py-1.5
              text-sm
              text-white
              focus:outline-none
              focus:ring-2
              focus:ring-[#004080]
            "
          />
        </div>
      </div>

      {/* Nutrition (Hero) */}
      <div className="mb-6">
        <NutritionSummary
          entries={nutritionEntries}
          totalCalories={totalCalories}
          totalProtein={totalProtein}
        />
      </div>

      {/* Secondary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Weight weightData={weight} />
        <WorkoutSummary workoutData={workout} />
      </div>

      {/* Log Menu (ONLY WHEN OPEN) */}
      {isLogOpen && <Log onClose={() => setIsLogOpen(false)} />}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsLogOpen(!isLogOpen)}
        className="
          fixed bottom-5 right-5 z-50
          bg-[#004080] hover:bg-[#003366]
          text-white p-4 rounded-full
          shadow-lg transition
        "
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default Dashboard;
