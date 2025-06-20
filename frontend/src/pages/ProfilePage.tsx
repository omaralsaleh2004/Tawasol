import { Button } from "@mui/material";
import { useProfile } from "../context/Profile/ProfileContext";
import { useEffect } from "react";

export const ProfilePage = () => {
  const { profile, fetchProfile } = useProfile();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(profile);
  return (
    <div>
      {profile ? (
        <Button variant="contained">Edit Profile </Button>
      ) : (
        <Button variant="contained">Create Profile </Button>
      )}
    </div>
  );
};
