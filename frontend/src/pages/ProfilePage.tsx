import { Box, Button, Typography } from "@mui/material";
import { useProfile } from "../context/Profile/ProfileContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assests/default.png";
import BasicInfo from "../components/BasicInfo";
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
        <div>
          <div className="row1">
            <div className="profile-img-name">
              <img
                className="profile-img"
                alt="Profile Image"
                src={defaultImage}
              />
              <h1>{profile.userId.firstName}</h1>
            </div>
            <BasicInfo />
          </div>
          <div className="row2">
            <div className="section">
              <div className="header">
                <h3>Education</h3>
                <button>➕</button>
              </div>
              <div className="content-box">
                <p>🎓 Item 1</p>
                <p>🎓 Item 2</p>
                <p>🎓 Item 3</p>
                {/* Add more to test scrolling */}
              </div>
            </div>

            {/* Experience */}
            <div className="section">
              <div className="header">
                <h3>Experience</h3>
                <button>➕</button>
              </div>
              <div className="content-box">
                <p>💼 Item 1</p>
                <p>💼 Item 2</p>
                <p>💼 Item 1</p>
                <p>💼 Item 2</p>
                <p>💼 Item 1</p>
                <p>💼 Item 2</p>
              </div>
            </div>
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
