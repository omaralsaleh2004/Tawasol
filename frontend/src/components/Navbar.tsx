import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

export default function Navbar() {
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
          <Button color="inherit" sx={{ fontSize: "18px" }}>
            Tawasol
          </Button>
          <Button color="inherit" sx={{ fontSize: "18px" }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
