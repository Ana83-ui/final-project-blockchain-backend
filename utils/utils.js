const jwt = require("jsonwebtoken");

const createToken = (payload, isRefreshToken) => {
  if (isRefreshToken) {
  return jwt.sign(payload, process.env.SECRET_TOKEN_REFRESH, { expiresIn: "60min" });
}
  return jwt.sign(payload, process.env.SECRET_TOKEN, { expiresIn: "15min" });
};

module.exports = { createToken };
