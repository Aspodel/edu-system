import React from "react";
import { IClass } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";

interface IClassServiceModel extends IBaseServiceModel<IClass> {}

export function ClassService(): IClassServiceModel {
  const { get, getDetails, create, update, remove } = BaseService<IClass>({
    controllerPath: "class",
  });

  return {
    get,
    getDetails,
    create,
    update,
    remove,
  };
}
