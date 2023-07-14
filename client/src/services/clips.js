import axios from "axios";
const baseUrl = "/api/clips";

const update = async (id, newObj) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObj);
  return res.data;
};

export default { update };
