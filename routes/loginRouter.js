const express = require("express");
const { signup, login } = require("../controllers/loginController");
const { tokenVerify } = require("../middleware/auth-token");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/refresh", tokenVerify);

module.exports = router;
