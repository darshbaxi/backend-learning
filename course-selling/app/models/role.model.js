const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const roleSchema = new Schema({
    name:String
});

const roleModel = mongoose.model("Role",roleSchema);

module.exports=roleModel;