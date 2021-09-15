const jwt = require('jsonwebtoken');
const { User } = require('../models/userSignUp');

const authenticate = async (req, res, next) => {
    const token = req.cookies.jwtoken;
    if (!token) return res.status(403).json({ message: "Access Denied!!" })
    try {

        //all user info from database will be saved of this verified token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({ _id: decoded._id, "tokens.token": token })
        if (!rootUser) return res.status(400).send("User Not Found")
        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id
        next();
    } catch (err) {
        res.status(401).json({ message: "unathorized!No token Provided" })
    }
}
module.exports = authenticate;