const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRoute");
app.use(express.json());
require("./src/config/conn");

//user route prifix
app.use("/user", userRouter);

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
