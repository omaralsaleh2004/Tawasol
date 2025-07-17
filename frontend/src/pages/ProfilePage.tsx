import { Box, Button, Typography } from "@mui/material";
import { useProfile } from "../context/Profile/ProfileContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicInfo from "../components/BasicInfo";
import ExperienceComponent from "../components/ExperienceComponent";
import EducationComponent from "../components/EducationComponent";
import { useUser } from "../context/User/UserContext";
import defaultImage from "../assests/default.png";
import { getProfileImageUrl } from "../utils/useProfileImage";
import MoonLoader from "react-spinners/moonLoader";

export const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [loading, setLoading] = useState(true);
  const { profile, fetchProfile } = useProfile();
  const { getUser } = useUser();
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate("/create-profile");
  };

  useEffect(() => {
    setLoading(true);
    fetchProfile();
    getUser();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!profile || !profile.userId._id) return;
    const loadPostOwnerImage = async () => {
      const img = await getProfileImageUrl(profile.userId._id);
      setProfileImage(img);
    };
    loadPostOwnerImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.userId._id]);

  //const profileImage = useProfileImage(profile?.userId?._id);
  console.log(profile);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <MoonLoader size={50} color="#1976d2" />
      </Box>
    );
  }
  return (
    <div>
      {profile ? (
        <div>
          <div className="row1">
            <div className="profile-img-name">
              <img
                className="profile-img"
                alt="Profile Image"
                src={profileImage}
              />
              <h1>
                {profile.userId.firstName} {profile.userId.lastName}
              </h1>
            </div>
            <BasicInfo />
          </div>
          <div className="row2">
            <EducationComponent />
            <ExperienceComponent />
          </div>
        </div>
      ) : (
        <Box
          sx={{
            margin: "30px 0 0 20px",
          }}
        >
          <Typography variant="h6">Please create a profile</Typography>
          <Button
            onClick={handleCreateProfile}
            sx={{
              marginTop: "5px",
            }}
            variant="contained"
          >
            Create Profile
          </Button>
        </Box>
      )}
    </div>
  );
};
