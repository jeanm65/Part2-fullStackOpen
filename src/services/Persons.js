import { PERSONS_ENDPOINT } from "../utils/constants";
import { create, find} from "./api";

export const getPersons = async () => {
  const result = await find(PERSONS_ENDPOINT);
  return result;
};

export const createPerson = async (values) => {
  const result = await create(PERSONS_ENDPOINT, values);
  return result;
};