const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    email:{ type: String, unique: true },
    password:String,
    firstName: String,
    lastName: String,
    roles:[
        {
            type:ObjectId,
            ref:"Role"
        }
    ]
});

const userModel = mongoose.model("User",userSchema);

module.exports=userModel;
