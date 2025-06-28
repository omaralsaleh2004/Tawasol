import { useState, type FC, type PropsWithChildren } from "react";

import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/BaseUrl";
import { UserContext } from "./UserContext";
import type { User } from "../../types/Profile";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  const [imageVersion, setImageVersion] = useState(0);

  const updateImageVersion = () => setImageVersion((v) => v + 1);
  const getUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setUser(null);
        return;
      }

      const user = await response.json();
      console.log("from User User", user);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        imageVersion,
        updateImageVersion,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
