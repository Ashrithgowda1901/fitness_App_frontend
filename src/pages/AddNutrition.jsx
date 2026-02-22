import api from "../service/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddNutrition = () => {

    const getToday=()=>{
        return new Date().toISOString().split("T")[0];
    }


  const [foods, setFoods] = useState([]);
  const[selectedFood,setSelectedFood]=useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const[date,setDate]=useState(getToday())
  const navigate=useNavigate();

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const foods = await api.get("/api/foods");
        if (foods.status === 200) {          
          setFoods(foods.data);
        }
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.message);
          setFoods(null);
        } else {
          console.log(err.message);
          setFoods(null);
        }
      }
    };
    fetchFood();
  }, []);

  const handleFood=async()=>{
    try
    {
        if(!date||foodQuantity==""||selectedFood==""||Number(foodQuantity)<=0)
        {
            alert("Date, food and quantity are required");
            return;
        }
        const response=await api.post("/api/nutritionLogs",
            {
                date:date,
                foodId:selectedFood,
                quantityGrams:foodQuantity
            }
        );

        if(response.status===201)
        {
            alert(response.data.message || "Food saved successfully");
            navigate(-1);
        }
    }
    catch(err)
    {
        if (err.response) {
            // Backend error (400 / 500)
            alert(err.response.data.message || "Something went wrong");
          } else {
            // Network / server down
            alert("Unable to connect to server");
          }        
    }
  }

  return (
    <div className="text-white bg-black min-h-screen px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add Nutrition</h1>
      <div className="max-w-sm mx-auto space-y-4 ">
        <div>
          <label className="block text-gray-400 mb-1">Date</label>
          <input
          value={date}
          onChange={(e)=>{
            setDate(e.target.value)
          }}
            type="date"
            className="w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]"
          />
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Food</label>
          <select
            value={selectedFood}
            onChange={(e)=>{
                setSelectedFood(e.target.value)
            }}
            className="w-full bg-neutral-900 border-gray-800
            rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#004080]"
          >
            <option value="">Select Food</option>
            {foods.map((food) => (
              <option key={food._id} value={food._id}>
                {food.foodName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 mb-1">Quantity (gm)</label>
          <input
          value={foodQuantity}
          onChange={(e)=>{
            setFoodQuantity(e.target.value)
          }}
            type="number"
            className="w-full bg-neutral-900 border border-gray-800
      rounded-md px-3 py-2 text-white
      focus:outline-none focus:ring-2 focus:ring-[#004080]"
          />
        </div>

        {/* Actions */}
        <button
       onClick={()=>{
        handleFood()
       }}
          className="
    w-full bg-[#004080] hover:bg-[#003366]
    text-white py-2 rounded-lg
    font-medium transition
  "
        >
          Save Food
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

export default AddNutrition;
