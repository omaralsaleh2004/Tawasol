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
import ExperienceForm from "./pages/ProfileForm/ExperienceFrom";
import EducationForm from "./pages/ProfileForm/EducationForm";
import UserProvider from "./context/User/UserProvider";
import DeveloperPage from "./pages/DevelopePage";
import { DeveloperProfilePage } from "./pages/DeveloperProfilePage";
import SettingsPage from "./pages/SettingsPage";
import PostPage from "./pages/Post/PostPage";
import PostProvider from "./context/Posts/PostProvider";
import CommentPage from "./pages/Post/CommentPage";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <UserProvider>
          <PostProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<ProfilePage />} />
                  <Route path="/posts" element={<PostPage />} />
                  <Route path="/developers" element={<DeveloperPage />} />
                  <Route path="/Settings" element={<SettingsPage />} />
                  <Route path="/create-profile" element={<ProfileFormPage />} />
                  <Route
                    path="/dev-profile/:id"
                    element={<DeveloperProfilePage />}
                  />
                  <Route path="/experience" element={<ExperienceForm />} />
                  <Route path="/education" element={<EducationForm />} />
                  <Route path="/comment/:id" element={<CommentPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </PostProvider>
        </UserProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
