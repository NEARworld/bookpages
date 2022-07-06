const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator")

const generateJwt = (id, roles) => {
    return jwt.sign(
        {id, roles}, 
        process.env.SECRET_KEY, 
        {expiresIn: '3h'} 
    );
};

class UserService {
    async registration(req, res) {
        // check validation
        const errorFormater = ({msg}) => {
            return `${msg}`
        };

        const errors = validationResult(req).formatWith(errorFormater)
        if(!errors.isEmpty()) {
            return ({message: "Password or email is invalid:", errors: errors.array()});
        }

        const {email, password} = req.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            throw new Error(`User with ${email} already exists`);
        }

        const hashedPassword = await bcrypt.hash(password, 6);

        const userRole = await Role.findOne({value: "USER"});
        const user = new User({email, password: hashedPassword, roles: [userRole.value]});
        await user.save();
        
        return user
    }

    async login(req, res) {
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if (!user) {
            throw new Error(`User with ${email} isn\'t found`);
        }

        const passIsCorrect = bcrypt.compareSync(password, user.password);

        if(!passIsCorrect) {
            throw new Error("Password is not correct");
        }

        const token = generateJwt(user._id, user.roles) 
        return {token: token}
    }

    // create a role for users ["USER", "ADMIN"]
    // async createRoles (req, res) {
    //     const userRole = new Role()
    //     userRole.save()
    //     return {userRole}
    // }
}

module.exports = new UserService();