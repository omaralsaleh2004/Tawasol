import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
