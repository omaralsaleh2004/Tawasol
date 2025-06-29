import { useEffect, useState } from "react";
import defaultImage from "../assests/default.png";

export const useProfileImage = (userId: string | undefined | null) => {
  const [profileImage, setProfileImage] = useState(defaultImage);

  useEffect(() => {
    if (!userId) {
      setProfileImage(defaultImage);
      return;
    }

    const baseUrl = `http://localhost:3001/images/${userId}`;
    const extensions = [".png", ".jpg", ".jpeg", ".webp"];
    let found = false;

    const tryLoadImages = async () => {
      for (const ext of extensions) {
        const url = `${baseUrl}${ext}`;
        try {
          const res = await fetch(url, { method: "HEAD" });
          if (res.ok) {
            setProfileImage(url);
            found = true;
            break;
          }
        } catch (err) {
          console.log(err);
        }
      }

      if (!found) {
        setProfileImage(defaultImage);
      }
    };

    tryLoadImages();
  }, [userId]);

  return profileImage;
};

export const getProfileImageUrl = async (userId: string): Promise<string> => {
  const extensions = ["png", "jpg", "jpeg", "webp"];
  for (const ext of extensions) {
    const url = `http://localhost:3001/images/${userId}.${ext}?v=${Date.now()}`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.ok) return url;
    } catch (err) {
      console.log(err);
    }
  }
  return defaultImage; // fallback
};
export const fetchProfileImage = async (userId: string): Promise<string> => {
  const extensions = ["png", "jpg", "jpeg", "webp"];
  for (const ext of extensions) {
    const baseUrl = `http://localhost:3001/images/${userId}.${ext}`;
    try {
      const res = await fetch(baseUrl, { method: "HEAD" });
      if (res.ok) {
        // return the full URL with a cache-busting param
        return `${baseUrl}?v=${Date.now()}`;
      }
    } catch (err) {
      console.log("HEAD check failed", err);
    }
  }
  return defaultImage;
};
