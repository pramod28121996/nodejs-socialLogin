const express = require("express");
const router = express.Router();
const end_points = require("../utils/endPoints");
const userController = require("../controller/userController");
const userAuthentication = require("../middleware/auth");

//route 1: sing up user method:post (http://localhost:8000/user/sing_up)
// required fields: userName, userEmail, userGender, userAddress, userPassword}
router.post(end_points.SING_UP, userController.register);

//route 2: login user method:post (http://localhost:8000/user/login)
// required fields: userEmail, userPassword}
router.post(end_points.LOGIN, userController.login);

//route 3: get user method:get (http://localhost:8000/user/me)
// required fields: userEmail, userPassword}
router.post(end_points.ME, userAuthentication,userController.getUser);

module.exports = router;
