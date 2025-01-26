const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const { items, totalAmount } = req.body;
  const userId = req.user.userId;
  try {
    const newOrder = new Order({ userId, items, totalAmount });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error placing order" });
  }
};

exports.getUserOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; 
  const userId = req.user.userId;
  try {
    const orders = await Order.find({ userId })
      .skip((page - 1) * limit) 
      .limit(parseInt(limit)) 
      .sort({ createdAt: -1 })
      .populate("items.productId"); 
    const totalItems = await Order.countDocuments({ userId }); 
    res.json({
      data: orders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};
