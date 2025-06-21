import { useState, type FC, type PropsWithChildren } from "react";
import { ProfileContext } from "./ProfileContext";
import type { IaddExperience, Profile } from "../../types/Profile";
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

  const createProfile = async (
    company: string,
    website: string,
    country: string,
    location: string,
    status: string,
    skills: string,
    bio: string
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/profile`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company,
          website,
          country,
          location,
          status,
          skills,
          bio,
        }),
      });
      if (!response.ok) {
        return;
      }

      const result = await response.json();
      console.log("from experience ", result);
    } catch (error) {
      console.error(error);
    }
  };

  const addExperience = async ({
    company,
    current,
    from,
    location,
    title,
    to,
  }: IaddExperience) => {
    try {
      const response = await fetch(`${BASE_URL}/profile/experience`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company,
          current,
          from,
          location,
          title,
          to,
        }),
      });
      if (!response.ok) {
        return;
      }

      const result = await response.json();
      console.log("from Create Profile", result);
      setProfile(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        fetchProfile,
        createProfile,
        addExperience,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
