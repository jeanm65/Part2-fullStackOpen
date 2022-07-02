import axios from "axios";
import { BASE_URL } from "../utils/constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const find = async (url) => {
  const result = await instance.get(url);
  if (result.status !== 200) return;
  return result.data;
};

export const create = async (url, values) => {
  const result = await instance.post(url, values);
  console.log("url POST", url);
  console.log("values POST", values);

  console.log("result POST:", result);

  if (result.status !== 200) return;
  return result.data;
};

export const remove = async (url, id) => {
  const result = await instance.delete(url + "/" + id);

  // console.log("url of delete:", url);
  // console.log(`true url of delete: ${url + "/" + id}`);

  if (result.status !== 200) return;
  return result.data;
};

export const edit = async (url, id, values) => {
  // try {
    const completeUrl = url + "/" + id;
    console.log("edit [request]: ", { url: completeUrl, values });
    const result = await instance.put(completeUrl, values);
    console.log("edit [result]: ", result);

    if (result.status !== 200) return;
    return result.data;
  // } catch (error) {
    // console.log(error.message);
  // }
};
