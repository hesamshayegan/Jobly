const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const user = {
  username: "hesam",
  isAdmin: true,
};

const token = jwt.sign(user, SECRET_KEY);

console.log(token);