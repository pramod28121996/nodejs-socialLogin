const socialUserModel = require("../models/socialUserModel");
const SSECRET_KEY = require("../utils/secretKey");
const jwt = require("jsonwebtoken");

const socialLogin = async (user) => {
  const response = await socialUserModel.findOne({ userEmail: user.userEmail });
  if (response) {
    const token = jwt.sign({ _id: response._id }, SSECRET_KEY, {
      expiresIn: "1d",
    });
    return {
      isValid: true,
      data: token,
      status: 200,
      message: "Login successfully",
    };
  } else {
    return {
      isValid: false,
      data: null,
      status: 400,
      message: "User not found",
    };
  }
};

const socialLoginFacebook = async (user) => {
  const response = await socialUserModel.findOne({
    facebookId: user.facebookId,
  });
  if (response) {
    const token = jwt.sign({ _id: response._id }, SSECRET_KEY, {
      expiresIn: "1d",
    });
    return {
      isValid: true,
      data: token,
      status: 200,
      message: "Login successfully",
    };
  } else {
    return {
      isValid: false,
      data: null,
      status: 400,
      message: "User not found",
    };
  }
};

module.exports = { socialLogin, socialLoginFacebook };
