const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.purchase = require("./purchase.model");
db.course = require("./course.model");

db.ROLES = ["creator", "student"];

module.exports = db;