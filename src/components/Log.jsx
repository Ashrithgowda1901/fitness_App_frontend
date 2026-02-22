import Button from "../components/Button";
import { useNavigate } from "react-router-dom";



const Log = ({onClose}) => {
  const navigate=useNavigate();


  const handleNavigate=(path)=>{
    navigate(path);
    onClose();
  }



    return (
      <ul className="
        fixed bottom-24 right-5 z-40
        bg-neutral-900 border border-gray-800
        rounded-lg p-3 space-y-2
      ">
        <li><Button name="Log Nutrition" onclick={()=>handleNavigate("/add-nutrition")} /></li>
        <li><Button name="Log Workout" onclick={()=>handleNavigate("/add-workout")}  /></li>
        <li><Button name="Log Weight" onclick={()=>handleNavigate("/add-weight")}  /></li>
      </ul>
    );
  };
  
  export default Log;
  