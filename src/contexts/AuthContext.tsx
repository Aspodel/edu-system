import React from "react";
import { AuthService, IAuthServiceModel } from "services";

export interface IAuthContextModel extends IAuthServiceModel {}

const defaultAuthContextValue: IAuthContextModel = {
  login: async () => {},
  logout: () => {},
};

export const AuthContext = React.createContext(defaultAuthContextValue);

export function AuthProvider({ children }: any) {
  const { userInfor, login, logout } = AuthService();

  return (
    <AuthContext.Provider value={{ userInfor, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => React.useContext(AuthContext);
