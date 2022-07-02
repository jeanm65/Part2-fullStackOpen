import axios from "axios";
import { BASE_URL } from "../utils/constants";

const instance = axios.create({
  baseURL: BASE_URL
});

export const find = async (url) => {
  const result = await instance.get(url);
  if (result.status !== 200) return;
  return result.data;
};

export const create = async (url, values) => {
  const result = await instance.post(url, values);
  if (result.status !== 200) return;
  return result.data;
};

