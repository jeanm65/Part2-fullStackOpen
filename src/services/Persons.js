import { PERSONS_ENDPOINT } from "../utils/constants";
import { create, find, remove} from "./api";

export const getPersons = async () => {
  const result = await find(PERSONS_ENDPOINT);
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