import axios from "axios";
const baseurl = "/api/users";

const getUser = async (id) => {
  const res = await axios.get(`${baseurl}/${id}`);
  return res.data;
};

const updateScore = async (id, newObj) => {
  const res = await axios.put(`${baseurl}/${id}`, newObj);
  return res.data;
};

const updateGame = async (id) => {
  const res = await axios.put(`${baseurl}/update/${id}`);
  return res.data;
};

const deleteUser = async (id) => {
  const res = await axios.delete(`${baseurl}/${id}`);
  return res.data;
};

const create = async () => {
  const res = await axios.post(baseurl);
  return res.data;
};

export default { getUser, updateGame, updateScore, deleteUser, create };
