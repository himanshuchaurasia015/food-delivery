const express = require("express");
const { placeOrder, getUserOrders } = require("../controllers/orderController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").all(authMiddleware).post(placeOrder).get(getUserOrders);

module.exports = router;
