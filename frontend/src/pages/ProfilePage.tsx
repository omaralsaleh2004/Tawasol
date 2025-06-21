import { Box, Button, Typography } from "@mui/material";
import { useProfile } from "../context/Profile/ProfileContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const { profile, fetchProfile } = useProfile();
  const navigate = useNavigate();

  const handleCreateProfile = () => {
    navigate("/create-profile");
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(profile);
  return (
    <div>
      {profile ? (
        <Button variant="contained">Edit Profile </Button>
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
