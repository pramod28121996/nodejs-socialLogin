const socialUserService = require("../service/socialUserService");
class socialUserController {
    //user register controller for sing_up route
    socialLogin = async (req, res) => {
        try {
            let user = req.user;
            let response = await socialUserService.socialLogin(user);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(response.status).send(error);
        }
    };
    socialLoginFacebook = async (req, res) => {
        try {
            let user = req.user;
            let response = await socialUserService.socialLoginFacebook(user);
            res.status(response.status).send(response);
        } catch (error) {
            res.status(response.status).send(error);
        }
    };
}

module.exports = new socialUserController();