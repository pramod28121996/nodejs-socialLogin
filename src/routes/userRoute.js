const express = require("express");
const router = express.Router();
const end_points = require("../utils/endPoints");

const userController = require("../controller/userController");

//route 1: sing up user method:post (http://localhost:8000/user/sing_up)
// required fields: userName, userEmail, userGender, userAddress, userPassword}
router.post(end_points.SING_UP, userController.register);

module.exports = router;
