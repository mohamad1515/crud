import api from "./api";
import { IUser, IAddUser, IEditUser } from "../types/IUser";

export const addNewUser = async (data: IAddUser) => {
  return await api.post("/users", data);
};

export const getUsersList = async (): Promise<IUser[]> => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserItem = async (id: number): Promise<IUser> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const removeUserItem = async (id: number) => {
  const response = await api.delete(`/users/${id}`, {
    data: {
      id,
    },
  });
  return response;
};

export const editUserItem = async (data: IEditUser) => {
  const response = await api.put(`/users/${data.id}`, data); //${id}
  return response;
};
