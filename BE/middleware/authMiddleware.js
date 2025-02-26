const jwt = require('jsonwebtoken');

const JWT_SECRET = "your_secret_key"; // Store in environment variables in production

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied! No token provided." });

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded; // Attach userId to request
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token!" });
  }
};
