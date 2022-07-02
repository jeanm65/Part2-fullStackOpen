import { PERSONS_ENDPOINT } from "../utils/constants";
import { create, edit, find, remove } from "./api";

export const getPersons = async () => {
  const result = await find(PERSONS_ENDPOINT);
  return result;
};

export const getPersonById = async (id) => {
  const result = await find(PERSONS_ENDPOINT + "/" + id);
  
  return result;
};

export const getPersonByName = async (name) => {
  const result = await find(PERSONS_ENDPOINT + "/" + name);
  // console.log('result from getPersonByName:',result);
  
  return result;
};

export const createPerson = async (values) => {
  const result = await create(PERSONS_ENDPOINT, values);
  return result;
};

export const removePerson = async (id) => {
  const result = await remove(PERSONS_ENDPOINT, id);
  return result;
};

export const editPerson = async (id, values) => {
  const result = await edit(PERSONS_ENDPOINT, id, values); 
  console.log('result of edit:', result);
  return result;
};
