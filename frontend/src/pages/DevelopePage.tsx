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

const DeveloperPage = () => {
  const { profiles, fetchAllProfile } = useProfile();
  const { user } = useUser();
  useEffect(() => {
    fetchAllProfile();
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
          <Card sx={{ minWidth: 260 }}>
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
