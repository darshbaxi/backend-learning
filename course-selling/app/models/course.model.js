const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {
      type: ObjectId,
      ref: "User"
    }
});

const courseModel =  mongoose.model("Course",courseSchema);

module.exports = courseModel;