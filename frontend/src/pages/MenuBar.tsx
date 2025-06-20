import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { HomeFilled, PeopleAlt, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function MenuBar() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/home");
  };

  const handlePosts = () => {
    navigate("/posts");
  };
  const handleDevelopers = () => {
    navigate("/developers");
  };

  const handleSettings = () => {
    navigate("/settings");
  };
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            onClick={handleProfile}
            label="Home"
            icon={<HomeFilled />}
          />
          <BottomNavigationAction
            onClick={handlePosts}
            label="Posts"
            icon={<ArchiveIcon />}
          />
          <BottomNavigationAction
            onClick={handleDevelopers}
            label="Developers"
            icon={<PeopleAlt />}
          />
          <BottomNavigationAction
            onClick={handleSettings}
            label="Settings"
            icon={<Settings />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
