const userService = require("../service/userService");

class userController {
  //user register controller for sing_up route
  register = async (req, res) => {
    try {
      let user = req.body;
      let response = await userService.register(user);
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new userController();
