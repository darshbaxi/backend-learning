const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function signup(req, res) {
  try {
  
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });
    
    if (req.body.roles && req.body.roles.length > 0) {
      const roles = await Role.find({
        name: { $in: req.body.roles }
      });
      user.roles = roles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: "student" });
      user.roles = [role._id];
    }

    await user.save();

    res.send({ message: "User was registered successfully!" });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}



async function signin(req, res) {
  // console.log(req.body.email)
  try {
    // console.log(req.body.email)
    const user = await User.findOne({
      email : req.body.email
    }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    
    const token = jwt.sign(
      { id: user._id },
      config.secret,
      {
        algorithm: "HS256",
        expiresIn: 86400 
      }
    );

    
    const authorities = user.roles.map(
      role => "ROLE_" + role.name.toUpperCase()
    );

   
    res.status(200).send({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      roles: authorities,
      accessToken: token
    });

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

module.exports = {
  signup,
  signin
};
