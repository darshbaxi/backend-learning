const { verifyToken, isCreator } = require("../middlewares/auth");
const {createCourse,updateCourse,deleteCourse,getCreatorCourses,getAllCourses,getCourseById, getMyCourses} = require("../controllers/course.controller");

module.exports = app => {
  const router = require("express").Router();

  // user/students
  router.get("/my-courses",verifyToken, getMyCourses);
  router.get("/", getAllCourses);
  router.get("/:courseId",getCourseById);
 
  //  admin
  router.post("/", verifyToken, isCreator, createCourse);
  router.put("/:courseId", verifyToken, isCreator, updateCourse);
  router.delete("/:courseId", verifyToken, isCreator, deleteCourse);
  router.get("/creator/my-courses/", verifyToken, isCreator, getCreatorCourses);

  app.use("/courses", router);
};
