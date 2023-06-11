import React from "react";
import { IGrade } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";

interface IGradeServiceModel extends IBaseServiceModel<IGrade> {}

export function GradeService(): IGradeServiceModel {
  const { get, getDetails, create, update, remove } = BaseService<IGrade>({
    controllerPath: "grade",
  });

  return {
    get,
    getDetails,
    create,
    update,
    remove,
  };
}
