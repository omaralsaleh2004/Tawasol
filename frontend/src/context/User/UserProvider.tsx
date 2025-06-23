import { useState, type FC, type PropsWithChildren } from "react";

import { useAuth } from "../Auth/AuthContext";
import { BASE_URL } from "../../constants/BaseUrl";
import { UserContext } from "./UserContext";
import type { User } from "../../types/Profile";

const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const { token } = useAuth();
  const [user, setUser] = useState<User | null>(null);

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
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
