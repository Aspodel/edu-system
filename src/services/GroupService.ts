import React from "react";
import { ICreateGroupModel, IGroup } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IGradeServiceModel extends IBaseServiceModel<IGroup> {
  getByClass: (classId: number) => Promise<IGroup[]>;
  createByClass: (classId: number, item: ICreateGroupModel) => Promise<IGroup>;
}

export function GroupService(): IGradeServiceModel {
  const path = "group";
  const { get, getDetails, create, update, remove } = BaseService<IGroup>({
    controllerPath: path,
  });

  async function getByClass(classId: number) {
    const response = await apiClient.get(`${path}/class/${classId}`);
    return response?.data;
  }

  async function createByClass(classId: number, item: ICreateGroupModel) {
    const response = await apiClient.post(`${path}/class/${classId}`, item);
    return response?.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByClass,
    createByClass,
  };
}
