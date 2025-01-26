const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour expiration
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token"); // Clear the token cookie
  res.json({ message: "Logout successful" });
};

exports.authVerify = (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

exports.update = async (req, res) => {
  const { _id, password } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }

    user.password = password;
    await user.save();
    res.json({ message: "user updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};
