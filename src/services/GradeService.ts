import React from "react";
import { IGrade, IGradeRow, IStudentGrades } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IGradeServiceModel extends IBaseServiceModel<IGrade> {
  getByClass: (classId: number) => Promise<IGradeRow[]>;
  getByStudent: (studentId: string) => Promise<IStudentGrades[]>;
  getByStudentandGradeColumn: (
    studentId: string,
    gradeColumnId: number
  ) => Promise<IGrade>;
  createFromExcel: (classId: number, file: File) => Promise<IGrade[]>;
  updateRange: (grades: IGrade[]) => Promise<IGrade[]>;
}

export function GradeService(): IGradeServiceModel {
  const path = "grade";
  const { get, getDetails, create, update, remove } = BaseService<IGrade>({
    controllerPath: path,
  });

  async function getByClass(classId: number) {
    const response = await apiClient.get(`${path}/class/${classId}`);
    return response?.data;
  }

  async function getByStudent(studentId: string) {
    const response = await apiClient.get(`${path}/student/${studentId}`);
    return response?.data;
  }

  async function getByStudentandGradeColumn(
    studentId: string,
    gradeColumnId: number
  ) {
    const response = await apiClient.get(
      `${path}/student/${studentId}/column/${gradeColumnId}`
    );
    return response?.data;
  }

  async function createFromExcel(classId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await apiClient.post(
      `${path}/create-from-excel/${classId}`,
      formData
    );
    return response?.data;
  }

  async function updateRange(grades: IGrade[]) {
    const response = await apiClient.put(`${path}/update-range`, grades);
    return response?.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByClass,
    getByStudent,
    getByStudentandGradeColumn,
    createFromExcel,
    updateRange,
  };
}
