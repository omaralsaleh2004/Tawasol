import { useState, type FC, type PropsWithChildren } from "react";
import { ProfileContext } from "./ProfileContext";
import type {
  IaddEducation,
  IaddExperience,
  Profile,
} from "../../types/Profile";
import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/BaseUrl";

const ProfileProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);

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

  const fetchAllProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setProfiles([]);
        return;
      }

      const Profiles = await response.json();
      console.log("from Profiles ", Profiles);
      setProfiles(Profiles);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProfileById = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/profile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setProfile(null);
        return;
      }

      const Profile = await response.json();
      console.log("from Profile by id ", Profile);
      setProfile(Profile);
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

  const addEducation = async ({
    current,
    degree,
    fieldofstudy,
    from,
    school,
    to,
  }: IaddEducation) => {
    try {
      const response = await fetch(`${BASE_URL}/profile/education`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          school,
          current,
          from,
          degree,
          fieldofstudy,
          to,
        }),
      });
      if (!response.ok) {
        return;
      }

      const result = await response.json();
      console.log("from education Profile", result);
      setProfile(result);
      console.log("from education set", profile);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEducation = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/profile/education/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }
      const result = await response.json();
      console.log("result", result);
      setProfile((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          education: result.education,
        };
      });
      console.log("from from delete edu", profile);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExperience = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/profile/experience/${id}`, {
        method: "Delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return;
      }
      const result = await response.json();
      console.log("result", result);
      setProfile((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          experience: result.experience,
        };
      });
      console.log("from from delete exp", profile);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async () => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        const response = await fetch(`${BASE_URL}/profile`, {
          method: "Delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const error = await response.text();
          console.error("Failed to delete account:", error);
          return;
        }
        const result = await response.json();
        console.log("result", result);
        console.log("from from delete User", profile);
        logout();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const uploadProfileImage = async (data: FormData) => {
    try {
      const res = await fetch(`${BASE_URL}/profile/upload`, {
        method: "POST", // fix this line
        headers: {
          Authorization: `Bearer ${token}`,
          // ❌ Do NOT include Content-Type for FormData
        },
        body: data,
      });

      if (!res.ok) {
        console.log("Failed:", res.status, res.statusText);
        return;
      }

      const result = await res.text(); // or res.json() if your backend returns JSON
      console.log("Upload success:", result);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        profiles,
        fetchProfile,
        fetchAllProfile,
        fetchProfileById,
        createProfile,
        addExperience,
        addEducation,
        deleteEducation,
        deleteExperience,
        deleteAccount,
        uploadProfileImage,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
