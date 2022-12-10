const jwt = require("jsonwebtoken");

// Check Signing
exports.requireSigning = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.SECRET);

    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required!" });
  }
  next();
};

// Check User middleware
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(405).json({ message: "User Access Denied" });
  }
  next();
};
// Check Admin middleware
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(405).json({ message: "Admin Access Denied" });
  }
  next();
};
