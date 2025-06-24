import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import defaultImage from "../assests/default.png";
import { Typography } from "@mui/material";
import { useUser } from "../context/User/UserContext";
export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleHomePage = () => {
    navigate("/");
  };

  console.log("from navbar ", isAuthenticated);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {!isAuthenticated ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: "#214cb0", fontSize: "18px" }}
              onClick={handleHomePage}
            >
              Tawasol
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Avatar alt="Remy Sharp" src={defaultImage} />
              </Stack>
              <Typography>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>
          )}
          {!isAuthenticated ? (
            <Button
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "#214cb0", fontSize: "18px" }}
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <Button
              color="primary"
              variant="contained"
              sx={{ backgroundColor: "#214cb0", fontSize: "18px" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
