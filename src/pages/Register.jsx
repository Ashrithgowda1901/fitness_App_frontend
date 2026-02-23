import { useState } from "react";
import api from "../service/axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async () => {
    if (!email || !password || !firstName || !lastName) {
      alert("Email, password, first name and last name are required");
      return;
    }

    try {
      const response = await api.post(
        "/api/auth/register",
        { email, password, firstName, lastName }
      );

      if (response.status === 201) {
        alert("Registered successfully");
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          alert("User already exists. Please login.");
          navigate("/login");
        } else {
          alert(err.response.data.message || "Registration failed");
        }
      } else {
        alert("Unable to connect to server");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <div className="w-full max-w-sm border border-neutral-800 rounded-xl bg-neutral-900 flex flex-col gap-4 p-6">
        <h1 className="text-center text-xl font-semibold">Register</h1>

        <div>
          <label className="block text-gray-400 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-md p-2 text-white
            focus:outline-none focus:ring-2 focus:ring-[#004080]"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-md p-2 text-white
            focus:outline-none focus:ring-2 focus:ring-[#004080]"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-md p-2 text-white
            focus:outline-none focus:ring-2 focus:ring-[#004080]"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full bg-black border border-gray-700 rounded-md p-2 text-white
            focus:outline-none focus:ring-2 focus:ring-[#004080]"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-[#004080] hover:bg-[#003366]
          text-white py-2 rounded-lg font-medium transition"
        >
          Register
        </button>
        <button
          onClick={()=>{
            navigate(-1)
          }}
          className="w-full bg-[#004080] hover:bg-[#003366]
          text-white py-2 rounded-lg font-medium transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Register;