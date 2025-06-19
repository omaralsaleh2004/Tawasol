import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );

  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));

  const login = (username: string, token: string) => {
    setUsername(username);
    setToken(token);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
  };

  return (
    <AuthContext.Provider value={{username, token, login}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
