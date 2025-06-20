import { createContext, useContext } from "react";
import type { Profile } from "../../types/Profile";

interface ProfileContextType {
  profile: Profile | null;
  fetchProfile: () => void;
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  fetchProfile: () => {},
});

export const useProfile = () => useContext(ProfileContext);
