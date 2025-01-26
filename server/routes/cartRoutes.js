const express = require("express");
const {
  addItems,
  removeItems,
  getItems,
  clearCart,
} = require("../controllers/cartController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/add", authMiddleware, addItems);
router.post("/remove", authMiddleware, removeItems);
router.route("/:userId").all(authMiddleware).get(getItems).delete(clearCart);
module.exports = router;
