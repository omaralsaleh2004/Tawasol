import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

export default function Navbar() {
  const { username, token } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHomePage = () => {
    navigate("/");
  };

  console.log("from navbar", { username, token });
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
          <Button
            variant="contained"
            sx={{ backgroundColor: "#214cb0", fontSize: "18px" }}
            onClick={handleHomePage}
          >
            Tawasol
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ backgroundColor: "#214cb0", fontSize: "18px" }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
