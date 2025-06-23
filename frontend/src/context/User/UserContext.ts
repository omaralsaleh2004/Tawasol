import { createContext, useContext } from "react";
import type { User } from "../../types/Profile";

interface UserContextType {
  user: User | null;
  getUser: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  getUser: () => {},
});

export const useUser = () => useContext(UserContext);
