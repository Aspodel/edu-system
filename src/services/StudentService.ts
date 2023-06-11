import React from "react";
import { IRegisterCoursesModel, IStudent } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IStudentServiceModel extends IBaseServiceModel<IStudent> {
  getByDepartment: (departmentId: number) => Promise<IStudent[]>;
  createFromExcel: (file: File) => Promise<IStudent[]>;
  registerCourses: (item: IRegisterCoursesModel) => Promise<void>;
}

export function StudentService(): IStudentServiceModel {
  const { get, getDetails, create, update, remove } = BaseService<IStudent>({
    controllerPath: "student",
  });
  const path = "student";

  async function getByDepartment(departmentId: number) {
    const response = await apiClient.get(`${path}/department/${departmentId}`);
    return response?.data;
  }

  async function createFromExcel(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<IStudent[]>(
      `${path}/create-from-excel`,
      formData
    );
    return response?.data;
  }

  async function registerCourses(model: IRegisterCoursesModel) {
    const response = await apiClient.put(`${path}/register-courses`, model);
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
    registerCourses,
  };
}
