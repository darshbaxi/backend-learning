const db = require("../models")


const Course = db.course
// ----------------------------------for admin-------------------------------------

// create course 
async function creteCourse(req,res){
    try{
        const {title, description, price, imageUrl} =req.body
        const course = await Course.create({
                title,
                description,
                price,
                imageUrl,
                creatorId: req.userId 
        });

        res.status(201).json({
            message: "Course created successfully",
            courseId: course._id
        });

    }catch (err) {
        res.status(500).send({ message: err.message });
    }

};

//  update course
async function updateCourse(req, res) {
  try {
    const { courseId } = req.params;

   
    const { title, description, price, imageUrl } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.creatorId.toString() !== req.userId) {
      return res.status(403).json({
        message: "You are not allowed to update this course"
      });
    }


    if (title) course.title = title;
    if (description) course.description = description;
    if (price) course.price = price;
    if (imageUrl) course.imageUrl = imageUrl;

    await course.save();

    return res.status(200).json({
      message: "Course updated successfully",
      course
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to update course",
      error: err.message
    });
  }
}

// delete course

async function deleteCourse(req, res) {
  try {
    const { courseId } = req.params;

    const deleted = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: req.userId
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Course not found or not authorized"
      });
    }

    return res.status(200).json({
      message: "Course deleted successfully"
    });

  }catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  get creator all courses
async function getCreatorCourses(req, res) {
  try {
    const courses = await Course.find({
      creatorId: req.userId
    });

    return res.status(200).json({
      courses
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch courses",
      error: err.message
    });
  }
}

// ----------------------------------for student-------------------------------------

//  all courses
async function getAllCourses(req, res) {
  try {
    const courses = await Course.find()
      .select("-__v");

    return res.status(200).json({
      courses
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch courses",
      error: err.message
    });
  }
};

// course with id
async function getCourseById(req, res) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id)
      .populate("creatorId", "firstName lastName email");

    if (!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }

    return res.status(200).json({
      course
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch course",
      error: err.message
    });
  }
};

module.exports ={
    creteCourse,
    updateCourse,
    deleteCourse,
    getCreatorCourses,
    getAllCourses,
    getCourseById
}
