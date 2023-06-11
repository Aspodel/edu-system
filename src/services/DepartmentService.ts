import React from "react";
import { IDepartment } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IDepartmentServiceModel extends IBaseServiceModel<IDepartment> {
  createFromExcel(file: File): Promise<IDepartment[]>;
}

export function DepartmentService(): IDepartmentServiceModel {
  const { get, getDetails, create, update, remove } = BaseService<IDepartment>({
    controllerPath: "department",
  });
  const path = "department";

  async function createFromExcel(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<IDepartment[]>(
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
    createFromExcel,
  };
}
