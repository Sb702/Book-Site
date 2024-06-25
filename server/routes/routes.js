const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const userbookController = require("../controllers/userBookController");
const aiController = require("../controllers/aiController");
const authController = require("../controllers/authController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("test", userController.test);
// router to /protect that will the protect middleware from authController
router.post("/protect", authController.protect);


router.post("/search", bookController.search);
router.post("/save", bookController.save);
router.delete("/delete/:id", bookController.delete);

router.get("/books/:id", userbookController.getBooks);

router.post("/ai", aiController.ask);
router.post("/many", aiController.askMany);

module.exports = router;
