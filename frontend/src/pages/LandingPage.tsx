import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const handleLogin = () => {
    if (isAuthenticated) {
      navigate("/home");
      return;
    }
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/register");
  };

  return (
    <div className="Landing-page">
      <h1>TawaSol</h1>
      <div className="Landing-page-btn">
        <button onClick={handleSignup}>Sign Up</button>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
