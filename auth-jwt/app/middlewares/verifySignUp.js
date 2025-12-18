const db = require("../models")
const User = db.user
const ROLES = db.ROLES

const checkDuplicateUsernameEmail = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({
      username: req.body.username
    });

    if (userByUsername) {
      return res.status(400).json({
        message: "Username already exists"
      });
    }

    const userByEmail = await User.findOne({
      email: req.body.email
    });

    if (userByEmail) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    next(); 
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};


const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameEmail,
  checkRolesExisted
};

module.exports = verifySignUp;