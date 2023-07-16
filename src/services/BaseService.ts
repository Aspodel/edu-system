import axios from "axios";
import { apiClient } from "../configs/axios";
import { IDTO } from "../interfaces";
import { BASE_URL } from "../utils/constants";

// const token = localStorage.getItem("jwt");

// export const ApiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// });

interface IBaseServiceProps {
  controllerPath: string;
}

export interface IBaseServiceModel<T> {
  get: () => Promise<T[]>;
  getDetails: (id: number | string) => Promise<T>;
  create: (item: T) => Promise<T> | Promise<void>;
  update: (item: T) => Promise<void>;
  // updateRange: (items: T[]) => Promise<void>;
  remove: (id: number | string) => Promise<void>;
}

export function BaseService<T extends IDTO<number | string>>({
  controllerPath,
}: IBaseServiceProps): IBaseServiceModel<T> {
  async function get() {
    const response = await apiClient.get<T[]>(controllerPath);
    return response?.data;
  }

  async function getDetails(id: number | string) {
    const response = await apiClient.get<T>(`${controllerPath}/${id}`);
    return response?.data;
  }

  async function create(item: T) {
    const response = await apiClient.post<T>(controllerPath, item);
    return response?.data;
  }

  async function update(item: T) {
    await apiClient.put(`${controllerPath}`, item);
  }

  async function updateRange(items: T[]) {
    await apiClient.put(`${controllerPath}`, items);
  }

  async function remove(id: number | string) {
    await apiClient.delete(`${controllerPath}/${id}`);
  }

  return {
    get,
    getDetails,
    create,
    update,
    remove,
  };
}
