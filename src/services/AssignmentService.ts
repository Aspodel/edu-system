import React from "react";
import { IAssignment, ICreateAssignmentModel } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IAssignmentServiceModel extends IBaseServiceModel<IAssignment> {
  getByClass: (classId: number) => Promise<IAssignment[]>;
  createAssignment: (item: ICreateAssignmentModel) => Promise<IAssignment>;
}

export function AssignmentService(): IAssignmentServiceModel {
  const path = "assignment";
  const { get, getDetails, create, update, remove } = BaseService<IAssignment>({
    controllerPath: path,
  });

  async function getByClass(classId: number) {
    const response = await apiClient.get(`${path}/class/${classId}`);
    return response.data;
  }

  async function createAssignment(item: ICreateAssignmentModel) {
    const response = await apiClient.post(`${path}`, item);
    return response.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByClass,
    createAssignment,
  };
}
