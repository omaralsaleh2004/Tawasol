import { Box, Typography } from "@mui/material";
import { useProfile } from "../context/Profile/ProfileContext";
import defaultImage from "../assests/default.png";
import BasicInfo from "../components/BasicInfo";
import EduForDev from "../components/EduForDev";
import ExpForDev from "../components/ExpForDev";
import { useUser } from "../context/User/UserContext";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoonLoader from "react-spinners/moonLoader";

export const DeveloperProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const { profile, fetchProfileById } = useProfile();
  const [profileImage, setProfileImage] = useState(defaultImage);
  const { getUser } = useUser();
  const { id } = useParams();
  useEffect(() => {
    console.log("from params", id);
    if (id) {
      fetchProfileById(id);
    }
    getUser();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const loadImage = async () => {
      if (!profile?.userId?._id) return;

      const userId = profile.userId._id;
      const extensions = [".jpg", ".jpeg", ".png", ".webp"];
      const baseUrl = `http://localhost:3001/images/${userId}`;

      for (const ext of extensions) {
        const url = `${baseUrl}${ext}`;
        try {
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok) {
            setProfileImage(url);
            return;
          }
        } catch {
          // continue checking next extension
        }
      }

      setProfileImage(defaultImage);
    };

    loadImage();
  }, [profile]);
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
                defaultValue={defaultImage}
              />
              <h1>
                {profile.userId.firstName} {profile.userId.lastName}
              </h1>
            </div>
            <BasicInfo />
          </div>
          <div className="row2">
            <EduForDev />
            <ExpForDev />
          </div>
        </div>
      ) : (
        <Box
          sx={{
            margin: "30px 0 0 20px",
          }}
        >
          <Typography variant="h6">
            There is no profile for this user
          </Typography>
        </Box>
      )}
    </div>
  );
};
