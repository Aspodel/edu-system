import React from "react";
import { ILecturer } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface ILecturerServiceModel extends IBaseServiceModel<ILecturer> {
  getByDepartment: (departmentId: number) => Promise<ILecturer[]>;
  createFromExcel: (file: File) => Promise<ILecturer[]>;
}

export function LecturerService(): ILecturerServiceModel {
  const { get, getDetails, create, update, remove } = BaseService<ILecturer>({
    controllerPath: "lecturer",
  });
  const path = "lecturer";

  async function getByDepartment(departmentId: number) {
    const response = await apiClient.get(`${path}/department/${departmentId}`);
    return response?.data;
  }

  async function createFromExcel(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post(
      `${path}/create-from-excel`,
      formData
    );
    return response?.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByDepartment,
    createFromExcel,
  };
}
