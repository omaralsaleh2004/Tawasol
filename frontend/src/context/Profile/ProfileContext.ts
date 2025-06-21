import { createContext, useContext } from "react";
import type { Profile } from "../../types/Profile";

interface ProfileContextType {
  profile: Profile | null;
  fetchProfile: () => void;
  createProfile: (
    company: string,
    website: string,
    country: string,
    location: string,
    status: string,
    skills: string,
    bio: string,
  ) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  fetchProfile: () => {},
  createProfile: () => {},
});

export const useProfile = () => useContext(ProfileContext);
