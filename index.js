const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRoute");
const passport = require("passport"); 
const session = require("express-session");
const dotenv = require("dotenv");
const socialUserRouter = require("./src/routes/socialUserRoute");
const socialUserModel = require("./src/models/socialUserModel");

dotenv.config();

app.use(express.json());
require("./src/config/conn");
require("./src/config/passport");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(socialUserRouter);

//user route prefix
app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
