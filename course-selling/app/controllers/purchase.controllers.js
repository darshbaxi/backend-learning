const db = require("../models")


const Purchase = db.purchase
const Course = db.course;

async function purchaseCourse(req, res) {
  try {
    const userId = req.userId;               
    const { courseId } = req.params;      

   
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

   
    const existingPurchase = await Purchase.findOne({
      userId,
      courseId
    });

    if (existingPurchase) {
      return res.status(400).json({
        message: "Course already purchased"
      });
    }

    
    const purchase = await Purchase.create({
      userId,
      courseId
    });

   
    return res.status(201).json({
      message: "Course purchased successfully",
      purchaseId: purchase._id
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to purchase course",
      error: err.message
    });
  }
}

module.exports = {
  purchaseCourse
};

