const jwt = require("jsonwebtoken");

const tokenVerify = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ status: "Failed", message: "Access denied: No token provided" });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = payload;
    next();
  } catch (error) {
    try {
      const payload = jwt.verify(token, process.env.SECRET_TOKEN_REFRESH);
      req.user = payload;
      next();
    } catch (error) {
      return res.status(400).json({ status: "Failed", message: "Token expired or invalid" });
    }
  }
};

module.exports = { tokenVerify };
