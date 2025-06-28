import { createContext, useContext } from "react";
import type { User } from "../../types/Profile";

interface UserContextType {
  user: User | null;
  imageVersion: number;
  updateImageVersion: () => void;
  getUser: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  imageVersion: 0,
  updateImageVersion: () => {},
  getUser: () => {},
});

export const useUser = () => useContext(UserContext);
