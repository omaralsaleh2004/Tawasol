import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ArchiveIcon from "@mui/icons-material/Archive";
import Paper from "@mui/material/Paper";
import { HomeFilled, PeopleAlt, Settings } from "@mui/icons-material";

export default function HomePage() {
  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />

      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction label="Home" icon={<HomeFilled />} />
          <BottomNavigationAction label="Posts" icon={<ArchiveIcon />} />
          <BottomNavigationAction label="Developers" icon={<PeopleAlt />} />
          <BottomNavigationAction label="Settings" icon={<Settings />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
