import React from "react";
import {  IMessage } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IMessageServiceModel extends IBaseServiceModel<IMessage> {
  //   getByGroup: (groupId: number) => Promise<IDiscussion>;
  //   getByClass: (classId: number) => Promise<IDiscussion[]>;
}

export function MessageService(): IMessageServiceModel {
  const path = "message";
  const { get, getDetails, create, update, remove } = BaseService<IMessage>({
    controllerPath: path,
  });

  //   async function getByGroup(groupId: number) {
  //     const response = await apiClient.get(`${path}/group/${groupId}`);
  //     return response.data;
  //   }

  //   async function getByClass(classId: number) {
  //     const response = await apiClient.get(`${path}/class/${classId}`);
  //     return response.data;
  //   }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    // getByGroup,
    // getByClass,
    // createDiscussion,
  };
}
