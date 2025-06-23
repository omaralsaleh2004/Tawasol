import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import defaultImage from "../assests/default.png";
import { useProfile } from "../context/Profile/ProfileContext";
import { useUser } from "../context/User/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeveloperPage = () => {
  const { profiles, fetchAllProfile, fetchProfileById } = useProfile();
  const { user } = useUser();
  const navigate = useNavigate();
  const handleFetchProfile = (id: string) => {
    fetchProfileById(id);
    navigate("/dev-profile");
  };

  useEffect(() => {
    fetchAllProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(profiles);
  return (
    <Container
      sx={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "50px",
      }}
    >
      {" "}
      {profiles
        .filter((profile) => profile.userId._id !== user?._id)
        .map((profile) => (
          <Card
            sx={{ minWidth: 260 }}
            onClick={() => handleFetchProfile(profile.userId._id)}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="160"
                image={defaultImage}
                alt="green iguana"
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography gutterBottom variant="h5" component="div">
                  {profile.userId.firstName}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {profile.status}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
    </Container>
  );
};

export default DeveloperPage;
