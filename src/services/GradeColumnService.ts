import React from "react";
import { IGradeColumn } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IGradeColumnServiceModel extends IBaseServiceModel<IGradeColumn> {
  getByClass: (classId: number) => Promise<IGradeColumn[]>;
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

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByClass,
  };
}
