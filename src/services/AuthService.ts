import React from "react";
import { ICurrentUser, ILoginModel } from "interfaces";
import { CREDENTIAL_LOCALSTORAGE_KEY } from "utils/constants";
import { apiClient } from "configs";
import { useNavigate } from "react-router-dom";

export interface IAuthServiceModel {
  userInfor?: ICurrentUser;
  login: (model: ILoginModel) => Promise<void>;
  logout: () => void;
}

export function AuthService(): IAuthServiceModel {
  const controllerPath = "auth";
  const [userInfor, setUserInforState] = React.useState(
    getUserInforFromStorage()
  );

  function setUserInfor(userInfoData?: ICurrentUser) {
    console.log("setUserInfor", userInfoData);
    userInfoData && (userInfoData.role = userInfoData.roles[0]);
    saveUserInforToStorage(userInfoData);
    setUserInforState(userInfoData);
  }

  async function login(model: ILoginModel) {
    const response = await apiClient.post<{ data: ICurrentUser }>(
      `${controllerPath}/login`,
      model
    );
    console.log("Login data response", response.data.data);
    setUserInfor(response.data.data);
  }

  async function logout() {
    setUserInfor(undefined);
  }

  return { userInfor, login, logout };
}

function getUserInforFromStorage(): ICurrentUser | undefined {
  console.log("getUserInforFromStorage");
  const credential = localStorage.getItem(CREDENTIAL_LOCALSTORAGE_KEY);

  return credential ? JSON.parse(credential) : undefined;
}

function saveUserInforToStorage(infor: ICurrentUser | undefined) {
  console.log("saveUserInforToStorage", infor);
  infor
    ? localStorage.setItem(CREDENTIAL_LOCALSTORAGE_KEY, JSON.stringify(infor))
    : localStorage.removeItem(CREDENTIAL_LOCALSTORAGE_KEY);
}
