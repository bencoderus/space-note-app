import axios from "axios";
import { getAccessToken } from "../../auth/services/auth-service";
import config from "../config";

const TIMEOUT = 60 * 1000;

export const apiRequest = axios.create({
  baseURL: config.baseUrl,
  timeout: TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authApiRequest = () => {
  return axios.create({
    baseURL: config.baseUrl,
    timeout: TIMEOUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
};
