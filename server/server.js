const express = require("express");
const mongoose = require("./config/db");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN, // Frontend origin
    credentials: true, // Allow cookies and credentials
  })
);

const authRoutes = require("./routes/authRoutes");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/order", orderRoutes);
app.use("/cart", cartRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
