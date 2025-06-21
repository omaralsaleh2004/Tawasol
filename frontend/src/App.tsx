import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import AuthProvider from "./context/Auth/AuthProvider";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfileProvider from "./context/Profile/ProfileProvider";
import { ProfilePage } from "./pages/ProfilePage";
import ProfileFormPage from "./pages/ProfileForm/ProfileFormPage";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<ProfilePage />} />
              <Route path="/posts" element={<div>Posts Page</div>} />
              <Route path="/developers" element={<div>Developers Page</div>} />
              <Route path="/Settings" element={<div>Settings Page</div>} />
              <Route path="/create-profile" element={<ProfileFormPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
