import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl)
}

const create = nameObject => {
  return axios.post(baseUrl, nameObject)
}

const personServices =  {
  getAll,
  create
}

export default personServices;