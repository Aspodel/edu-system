import React from "react";
import { IClass, IConstraint, ICourse } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface ICourseServiceModel extends IBaseServiceModel<ICourse> {
  getByDepartment: (departmentId: number) => Promise<ICourse[]>;
  createFromExcel: (file: File) => Promise<ICourse[]>;
  createScheduleRecommendation: (
    courses: number[],
    constraint: IConstraint
  ) => Promise<IClass[][]>;
}

export function CourseService(): ICourseServiceModel {
  const { get, getDetails, create, update, remove } = BaseService<ICourse>({
    controllerPath: "course",
  });
  const path = "course";

  async function getByDepartment(departmentId: number) {
    const response = await apiClient.get<ICourse[]>(
      `${path}/department/${departmentId}`
    );
    return response?.data;
  }

  async function createFromExcel(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post<ICourse[]>(
      `${path}/create-from-excel`,
      formData
    );
    return response?.data;
  }

  async function createScheduleRecommendation(
    courses: number[],
    constraint: IConstraint
  ) {
    const response = await apiClient.post<IClass[][]>(
      `${path}/create-schedule-recommendation`,
      { courses, constraint }
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
    createScheduleRecommendation,
  };
}
