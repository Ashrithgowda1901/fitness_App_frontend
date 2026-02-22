import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import AddNutrition from "./pages/AddNutrition"
import AddWeight from "./pages/AddWeight"
import AddWorkout from "./pages/AddWorkout"
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register"
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Public */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          {/* Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-nutrition"
            element={
              <ProtectedRoute>
                <AddNutrition />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-weight"
            element={
              <ProtectedRoute>
                <AddWeight />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-workout"
            element={
              <ProtectedRoute>
                <AddWorkout />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
