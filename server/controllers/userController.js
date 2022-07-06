const userService = require("../service/userService");

class UserController {
    async registration (req, res) {
        try {
            const registeredUser = await userService.registration(req, res);
            return res.json(registeredUser);
        } catch (e) {
            return res.status(500).json({ error: true, message: e.message });
        }
    }

    async login (req, res) {
        try {
            const loggedUserToken = await userService.login(req, res);
            return res.json(loggedUserToken);
        } catch (e) {
            return res.status(500).json({error: true, message: e.message});
        }
    }

    // create a role for users ["USER", "ADMIN"]
    // async createRoles(req, res) {
    //     try {
    //     const data = await userService.getUsers(req);
    //     return res.json(data)
    //     } catch(e) {
    //     return res.status(400).json({message: 'Smth went wrong'})
    //     }
    // }
}

module.exports = new UserController();