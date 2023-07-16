import React from "react";
import { ICreateToDoItemModel, IToDoItem } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IToDoItemServiceModel extends IBaseServiceModel<IToDoItem> {
  getByToDoList: (toDoListId: number) => Promise<IToDoItem[]>;
  createTask: (toDoItem: ICreateToDoItemModel) => Promise<IToDoItem>;
  updateTask: (toDoItem: ICreateToDoItemModel) => Promise<IToDoItem>;
}

export function ToDoItemService(): IToDoItemServiceModel {
  const path = "todoitem";
  const { get, getDetails, create, update, remove } = BaseService<IToDoItem>({
    controllerPath: path,
  });

  async function getByToDoList(toDoListId: number) {
    const response = await apiClient.get(`${path}/todolist/${toDoListId}`);
    return response?.data;
  }

  async function createTask(toDoItem: ICreateToDoItemModel) {
    const response = await apiClient.post(`${path}`, toDoItem);
    return response?.data;
  }

  async function updateTask(toDoItem: ICreateToDoItemModel) {
    const response = await apiClient.put(`${path}`, toDoItem);
    return response?.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByToDoList,
    createTask,
    updateTask,
  };
}
