import { useState, type FC, type PropsWithChildren } from "react";
import { ProfileContext } from "./ProfileContext";
import type { Profile } from "../../types/Profile";
import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/BaseUrl";

const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const fetchProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setProfile(null);
        return;
      }

      const userProfile = await response.json();
      console.log("from respoonse.ok", userProfile);
      setProfile(userProfile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
