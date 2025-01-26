const Menu = require("../models/Menu");

exports.getMenu = async (req, res) => {
  const { page = 1, limit = 10, category = null, sort = null } = req.query; // Default pagination settings

  try {
    // Build query according to req
    const query = {};
    if (category) {
      query.category = category;
    }

    const sortCriteria = sort ? { [sort]: 1 } : {}; // Default to ascending order if sort provided

    const menu = await Menu.find(query)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(parseInt(limit)); //

    const totalItems = await Menu.countDocuments(query);

    res.json({
      data: menu,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Error fetching menu" });
  }
};

exports.addMenuItem = async (req, res) => {
  const { name, category, price, availability } = req.body;
  try {
    const newMenuItem = new Menu({ name, category, price, availability });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding menu item" });
  }
};

exports.updateMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating menu item" });
  }
};

exports.deleteMenuItem = async (req, res) => {
  const { id } = req.params;
  try {
    await Menu.findByIdAndDelete(id);
    res.json({ message: "Menu item deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting menu item" });
  }
};
