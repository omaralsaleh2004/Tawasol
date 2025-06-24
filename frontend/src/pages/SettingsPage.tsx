import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../context/Profile/ProfileContext";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { deleteAccount } = useProfile();

  const handleEdit = () => {
    navigate("/create-profile");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: "40px",
        gap: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          border: "1px solid rgb(129, 133, 139)",
          minWidth: "80%",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 1)",
          backgroundColor: "#e4e8f0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography>Update your Profile information</Typography>
        <Button onClick={handleEdit} variant="contained">
          Edit Account
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          border: "1px solid rgb(129, 133, 139)",
          minWidth: "80%",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 1px 1px 0 rgba(0, 0, 0, 1)",
          backgroundColor: "#e4e8f0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Typography>
          This will completely delete your account and remove you data from
          TawaSol
        </Typography>
        <Button variant="contained" onClick={deleteAccount}>
          Delete Account
        </Button>
      </Box>
    </Container>
  );
};

export default SettingsPage;
