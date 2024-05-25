const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const bookController = require("../controllers/bookController");
const userbookController = require("../controllers/userBookController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("test", userController.test);

router.post("/search", bookController.search);
router.post("/save", bookController.save);
router.delete("/delete/:id", bookController.delete);

router.get("/books/:id", userbookController.getBooks);

module.exports = router;
