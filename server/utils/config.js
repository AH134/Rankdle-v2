require("dotenv").config();

const PORT = process.env.PORT || 3000;
const MONGODBURI = process.env.MONGODBURI;

module.exports = {
  PORT,
  MONGODBURI,
};
