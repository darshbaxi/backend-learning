const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const purchaseSchema = new Schema({
    userId: {
        type:ObjectId,
        ref:"User"
    },
    courseId:{
        type:ObjectId,
        ref:"Course"
    },
    purchasedAt: {
      type: Date,
      default: Date.now,
    }
});

const purchaseModel =  mongoose.model("purchase",purchaseSchema);

module.exports = purchaseModel;