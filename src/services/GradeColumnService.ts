import React from "react";
import { IGradeColumn } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IGradeColumnServiceModel extends IBaseServiceModel<IGradeColumn> {
  getByClass: (classId: number) => Promise<IGradeColumn[]>;
  createRange: (items: IGradeColumn[]) => Promise<void>;
  updateRange: (items: IGradeColumn[]) => Promise<void>;
  removeRange: (ids: number[]) => Promise<void>;
}

export function GradeColumnService(): IGradeColumnServiceModel {
  const { get, getDetails, create, update, remove } = BaseService<IGradeColumn>(
    {
      controllerPath: "gradecolumn",
    }
  );
  const path = "gradecolumn";

  const getByClass = async (classId: number) => {
    const response = await apiClient.get<IGradeColumn[]>(
      path + "/class/" + classId
    );
    return response?.data;
  };

  async function createRange(items: IGradeColumn[]) {
    await apiClient.post(`${path}/create-range`, items);
  }

  async function updateRange(items: IGradeColumn[]) {
    await apiClient.put(`${path}/update-range`, items);
  }

  async function removeRange(ids: number[]) {
    await apiClient.delete(`${path}/delete-range`, { data: ids });
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByClass,
    createRange,
    updateRange,
    removeRange,
  };
}
