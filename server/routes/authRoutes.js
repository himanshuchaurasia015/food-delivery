const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  authVerify,
  update,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.put("/update", authMiddleware, update);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser); // Logout route
router.get("/verify", authVerify);
module.exports = router;
