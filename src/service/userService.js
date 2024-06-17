const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const joi = require("joi");
const saltRounds = 10;

let apiResponce = {
  isValid: true,
  message: "",
  data: null,
};
const register = async (user) => {
  //validation user data to check the data is valid or not
  const userValidation = joi.object({
    userName: joi.string().required(),
    userEmail: joi.string().email().required(),
    userGender: joi.string().valid("m", "f","o").required(),
    userAddress: joi.string().required(),
    userPassword: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[a-zA-Z\\d!@#$%^&*]{8,}$"
        )
      )
      .message(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character"
      )
      .required(),
  });
  const { error } = userValidation.validate(user);

  //return if error found and function close
  if (error) {
    apiResponce.isValid = false;
    apiResponce.data = null;
    apiResponce.message = error.details[0].message;
    return apiResponce;
  }

  //check email id in database if email is found then return error
  const isEmailUnique = await UserModel.findOne({ userEmail: user.userEmail });
  if (isEmailUnique) {
    apiResponce.isValid = false;
    apiResponce.data = null;
    apiResponce.message = "Email already exists";
    return apiResponce;
  }
  try {
    //bcrypt password and store in database
    user.userPassword = await bcrypt.hash(user.userPassword, saltRounds);
    const response = await UserModel(user);
    const result = await response.save();
    apiResponce.data = result;
    apiResponce.message = "User registered successfully";
  } catch (error) {
    apiResponce.isValid = false;
    apiResponce.data = null;
    apiResponce.message = error.message;
  } finally {
    return apiResponce;
  }
};

module.exports = { register };
