const userService = require("../service/userService");

class userController {
  //user register controller for sing_up route
  register = async (req, res) => {
    try {
      let user = req.body;
      let response = await userService.register(user);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(response.status).send(error);
    }
  };

  //user login controller for login route
  login = async (req, res) => {
    try {
      let user = req.body;
      let response = await userService.login(user);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(response.status).send(error);
    }
  };

  //user get controller for me route
  getUser = async (req, res) => {
    try {

      let response = await userService.getUser(req.headers.authorization);
      res.status(response.status).send(response);
    } catch (error) {
      res.status(response.status).send(error);
    }
  };

}

module.exports = new userController();
