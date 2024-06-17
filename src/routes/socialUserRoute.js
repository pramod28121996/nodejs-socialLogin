const express = require("express");
const router = express.Router();
const end_points = require("../utils/endPoints");
const socialUserController = require("../controller/socialUserController");
const passport = require("passport");

router.get(
  end_points.AUTH_GOOGLE,
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  end_points.SOCIAL_LOGIN_GOOGLE,
  passport.authenticate("google", { failureRedirect: "/" }),
  socialUserController.socialLogin
);

router.get(
  end_points.AUTH_FACEBOOK,
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  end_points.SOCIAL_LOGIN_FACEBOOK,
  passport.authenticate("facebook", { failureRedirect: "/" }),
  socialUserController.socialLoginFacebook
);

module.exports = router;
