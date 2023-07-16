import React from "react";
import { ICreateDiscussionModel, IDiscussion } from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface IDiscussionServiceModel extends IBaseServiceModel<IDiscussion> {
  getByGroup: (groupId: number) => Promise<IDiscussion>;
  getByClass: (classId: number) => Promise<IDiscussion[]>;
  createDiscussion: (
    discussion: ICreateDiscussionModel
  ) => Promise<IDiscussion>;
}

export function DiscussionService(): IDiscussionServiceModel {
  const path = "discussion";
  const { get, getDetails, create, update, remove } = BaseService<IDiscussion>({
    controllerPath: path,
  });

  async function getByGroup(groupId: number) {
    const response = await apiClient.get(`${path}/group/${groupId}`);
    return response.data;
  }

  async function getByClass(classId: number) {
    const response = await apiClient.get(`${path}/class/${classId}`);
    return response.data;
  }

  async function createDiscussion(discussion: ICreateDiscussionModel) {
    const response = await apiClient.post(`${path}`, discussion);
    return response.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getByGroup,
    getByClass,
    createDiscussion,
  };
}
