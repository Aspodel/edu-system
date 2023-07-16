import React from "react";
import { IToDoList } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IToDoListServiceModel extends IBaseServiceModel<IToDoList> {
    getByGroup: (groupId: number) => Promise<IToDoList[]>;
}

export function ToDoListService(): IToDoListServiceModel {
  const path = "todolist";
  const { get, getDetails, create, update, remove } = BaseService<IToDoList>({
    controllerPath: path,
  });

  async function getByGroup(groupId: number) {
    const response = await apiClient.get(`${path}/group/${groupId}`);
    return response?.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByGroup,
  };
}
