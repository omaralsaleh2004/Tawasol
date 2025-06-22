import { createContext, useContext } from "react";
import type {
  IaddEducation,
  IaddExperience,
  Profile,
} from "../../types/Profile";

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
    bio: string
  ) => void;
  addExperience: ({
    company,
    current,
    from,
    location,
    title,
    to,
  }: IaddExperience) => void;

  addEducation: ({
    current,
    degree,
    fieldofstudy,
    from,
    school,
    to,
  }: IaddEducation) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
  profile: null,
  fetchProfile: () => {},
  createProfile: () => {},
  addExperience: () => {},
  addEducation: () => {},
});

export const useProfile = () => useContext(ProfileContext);
