const express = require("express");
const {
  getMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();
router.route("/", authMiddleware).get(getMenu).post(addMenuItem);
router
  .route("/:id")
  .all(authMiddleware)
  .put(updateMenuItem)
  .delete(deleteMenuItem);

module.exports = router;
