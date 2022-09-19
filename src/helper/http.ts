import axios from "axios";
import { Const } from "../constants";

const http_client = axios.create({
  baseURL: Const.API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
  },
});
class HttpClientHelper {
  async get<T>(endpoint: string) {
    try {
      const response = await http_client.get<T>(endpoint);
      return response;
    } catch (error) {}
  }

  async post<T, U>(endpoint: string, payload?: U, headerConfig?: any) {
    try {
      const response = await http_client.post<T>(
        endpoint,
        payload,
        headerConfig
      );
      return response;
    } catch (error) {}
  }

  async put<T, U>(endpoint: string, payload: U) {
    try {
      const response = await http_client.put<T>(endpoint, payload);
      return response;
    } catch (ex) {}
  }

  async patch<T, U>(endpoint: string, payload: U) {
    try {
      const response = await http_client.patch<T>(endpoint, payload);
      return response;
    } catch (ex) {}
  }

  async delete<T, U = {}>(endpoint: string, payload?: any, idParam?: number) {
    try {
      const response = await http_client.delete<T>(endpoint, payload);
      return response;
    } catch (ex) {
      return {} as T;
    }
  }
}

export const ApiHelper = new HttpClientHelper();
