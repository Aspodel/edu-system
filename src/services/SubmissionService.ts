import React from "react";
import {
  ICreateFileSubmissionModel,
  IFileSubmission,
  ISubmission,
} from "../interfaces";
import { BaseService, IBaseServiceModel } from "./BaseService";
import { apiClient } from "configs";

interface ISubmissionServiceModel extends IBaseServiceModel<ISubmission> {
  getFileByGroup: (groupId: number) => Promise<IFileSubmission[]>;
  getFileByClass: (classId: number) => Promise<IFileSubmission[]>;
  createFileSubmission: (
    item: IFileSubmission,
    file: File
  ) => Promise<IFileSubmission>;
}

export function SubmissionService(): ISubmissionServiceModel {
  const path = "submission";
  const { get, getDetails, create, update, remove } = BaseService<ISubmission>({
    controllerPath: path,
  });

  async function getFileByGroup(groupId: number) {
    const response = await apiClient.get(`${path}/file/group/${groupId}`);
    return response.data;
  }

  async function getFileByClass(classId: number) {
    const response = await apiClient.get(`${path}/file/class/${classId}`);
    return response.data;
  }

  async function createFileSubmission(item: IFileSubmission, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", item.fileName);
    formData.append("description", item.description || "");
    formData.append("studentId", item.studentId);
    formData.append("groupId", item.groupId?.toString() || "");
    formData.append("assignmentId", item.assignmentId.toString());

    const response = await apiClient.post(`${path}/file`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
    getFileByGroup,
    getFileByClass,
    createFileSubmission,
  };
}
