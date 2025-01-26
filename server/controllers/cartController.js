const Cart = require("../models/Cart");
const Menu = require("../models/Menu");

exports.addItems = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const product = await Menu.findById(productId).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = product.price;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price });
    }

    cart.totalPrice = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await cart.save();
    const populatedCart = await cart.populate("items.productId");
    res.status(200).json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

exports.removeItems = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the product
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Update total price
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0);

    // Save the cart
    await cart.save();
    const populatedCart = await cart.populate("items.productId");
    res.status(200).json(populatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error removing from cart" });
  }
};

exports.getItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

exports.clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOneAndDelete({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "cart cleared" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching cart" });
  }
};
