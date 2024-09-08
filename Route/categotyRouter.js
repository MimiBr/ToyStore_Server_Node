const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categotyController");
const createToken=require("../middelwares/autorition")


router.get('/getAllCategories', categoryController.getAllCategories);
router.post('/createCategory',createToken, categoryController.createCategory)

module.exports = router;