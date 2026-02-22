import { useState, useContext } from "react";
import api from "../service/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      // 1️⃣ login
      await api.post(
        "/api/auth/login",
        { email, password },        
      );

      // 2️⃣ get user
      const me = await api.get("/api/auth/me", {        
      });

      // 3️⃣ update auth context
      setUser(me.data.user);

      // 4️⃣ redirect
      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Unable to connect to server");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-black text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm border border-neutral-800 rounded-xl bg-neutral-900 flex flex-col gap-4 p-6"
      >
        <h1 className="text-center text-xl font-semibold">Login</h1>

        {error && (
          <div className="text-center">
            <p className="text-red-500 text-sm">{error}</p>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="mt-2 text-sm text-blue-400 hover:underline"
            >
              New user? Register
            </button>
          </div>
        )}

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

        <button
          type="submit"
          className="w-full bg-[#004080] hover:bg-[#003366]
          text-white py-2 rounded-lg font-medium transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
