const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const joi = require("joi");
const { bcryptPassword, comparePassword } = require("../utils/hashPass");
const SECRET_KEY = require("../utils/secretKey");

let apiResponce = {
  isValid: true,
  message: "",
  data: null,
  status: 200,
};
const register = async (user) => {
  //validation user data to check the data is valid or not
  const userValidation = joi.object({
    userName: joi.string().required(),
    userEmail: joi.string().email().required(),
    userGender: joi.string().valid("m", "f", "o").required(),
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
    apiResponce.status = 400;
    return apiResponce;
  }

  try {
    //check email id in database if email is found then return error
    const isEmailUnique = await UserModel.findOne({
      userEmail: user.userEmail,
    });
    if (isEmailUnique) {
      apiResponce.isValid = false;
      apiResponce.data = null;
      apiResponce.message = "Email already exists";
      apiResponce.status = 400;
      return apiResponce;
    }
    //bcrypt password and store in database
    user.userPassword = await bcryptPassword(user.userPassword);
    const response = await UserModel(user);
    const result = await response.save();
    apiResponce.data = result;
    apiResponce.status = 200;
    apiResponce.message = "User registered successfully";
  } catch (error) {
    apiResponce.isValid = false;
    apiResponce.data = null;
    apiResponce.message = error.message;
    apiResponce.status = 500;
  } finally {
    return apiResponce;
  }
};

const login = async (user) => {
  //validation user data to check the data is valid or not
  const userValidation = joi.object({
    userEmail: joi.string().email().required(),
    userPassword: joi.string().required(),
  });
  const { error } = userValidation.validate(user);

  //return if error found and function close
  if (error) {
    apiResponce.isValid = false;
    apiResponce.data = null;
    apiResponce.message = error.details[0].message;
    apiResponce.status = 400;
    return apiResponce;
  }

  try {
    //check email id in database if email is found then return error
    const response = await UserModel.findOne({ userEmail: user.userEmail ,isDelete:false});
    if (!response) {
      apiResponce.isValid = false;
      apiResponce.data = null;
      apiResponce.message = "User not found";
      apiResponce.status = 400;
      return apiResponce;
    }

    //compare password
    const result = await comparePassword(
      user.userPassword,
      response.userPassword
    );
    if (!result) {
      apiResponce.isValid = false;
      apiResponce.data = null;
      apiResponce.message = "Incorrect password";
      apiResponce.status = 400;
      return apiResponce;
    }
    //generate token
    const token = jwt.sign({ _id: response._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    apiResponce.data = token;
    apiResponce.status = 200;
    apiResponce.message = "Login successfully";
  } catch (error) {
    apiResponce.isValid = false;
    apiResponce.data = null;
    apiResponce.status = 500;
    apiResponce.message = error.message;
  } finally {
    return apiResponce;
  }
};

const getUser = async (token) => {
  try {
    const id = jwt.verify(token, SECRET_KEY)._id;
    const response = await UserModel.findOne({ _id: id, isDelete: false });
    if (!response) {
      apiResponce.isValid = false;
      apiResponce.data = null;
      apiResponce.message = "User not found";
      apiResponce.status = 400;
      return apiResponce;
    }
    apiResponce.data = response;
    apiResponce.status = 200;
    apiResponce.message = "User found successfully";
  } catch (error) {
    apiResponce.isValid = false;
    apiResponce.data = null;
    apiResponce.status = 500;
    apiResponce.message = error.message;
  } finally {
    return apiResponce;
  }
};

module.exports = { register, login, getUser };
