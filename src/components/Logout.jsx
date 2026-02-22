import api from "../service/axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post(
        "/api/auth/logout",
        {},        
      );

      // clear auth state
      setUser(null);

      // redirect to login
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 hover:bg-red-700
                 text-white rounded-md text-sm font-medium transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;