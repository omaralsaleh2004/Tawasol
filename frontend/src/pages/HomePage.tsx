import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
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
