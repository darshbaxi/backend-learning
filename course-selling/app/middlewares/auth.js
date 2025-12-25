const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;


const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"]; 
  
  // console.log(token)
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    req.userId = decoded.id;  
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

const isCreator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const roles = await Role.find({
      _id: { $in: user.roles }
    });

    const hasCreatorRole = roles.some(
      role => role.name === "creator"
    );

    if (!hasCreatorRole) {
      return res.status(403).json({
        message: "Require Creator Role!"
      });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    verifyToken,
    isCreator
}