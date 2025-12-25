const {verifyToken} = require("../middlewares/auth")
const {purchaseCourse} = require("../controllers/purchase.controllers")

module.exports = app => {
    const router = require("express").Router();
    router.post("/:courseId",verifyToken,purchaseCourse);
    app.use('/purchase',router);
};