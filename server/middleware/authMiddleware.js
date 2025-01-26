const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ("hello");
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "Invalid token structure" });
    }

    // Attach user
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    return res
      .status(500)
      .json({ message: "Server error during authentication" });
  }
};

module.exports = { authMiddleware };
