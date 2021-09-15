const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User } = require('../models/userSignUp');
const { List } = require('../models/emailList')
const auth = require('../midddleware/authorization')
const cookieParser = require('cookie-parser');
const router = express.Router();
const app = express();
app.use(cookieParser())
const cron = require('node-cron')
const nodemailer = require('nodemailer')

const EventEmitter = require('events');
const event = new EventEmitter();



//For Email Validation
function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}

// Signup
const signUp = async (req, res) => {
    let { name, email, password, cpassword } = req.body
    if (!name || !email || !cpassword || !password)
        return res.status(400).json({ message: "Fill All The Fields" })
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).json({ message: "Already Registered!!" })
    else if (req.body.password !== req.body.cpassword) {
        return res.status(400).json({ message: "password are not matched" })
    }
    else if (validateEmail(req.body.email) == false) {
        return res.status(400).json({ message: "give a valid email Addreess" })
    }

    else {
        user = new User(req.body)

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.cpassword = await bcrypt.hash(user.cpassword, salt);
        let result = await user.save();
        res.status(200).send({
            data: _.pick(result, ['_id', 'name', 'email',])
        });
    }

}

// Login

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: "fill the empty field" });
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ message: "This email is not registered" });
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) return res.status(400).json({ message: "incorrect Password" });

    const token = user.generateJWT();


    res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
    });
    const result = await user.save();
    res.status(200).send({
        token: token,
        data: _.pick(result, ['name', 'email'])
    })

}

//For authentication
const getData = async (req, res) => {
    return res.send(req.rootUser)
}


// Sending Mail

const sendMail = async (req, res) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",  // Replace with your live SMTP server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: req.body.from,
            pass: req.body.password,
        },
    });
    const { from, subject, text, password, email, minute, hour } = req.body
    if (!from || !text || !password || !subject || !email || !minute || !hour) {
        return res.status(400).json({ message: "Fill all the fields" })
    }
    if (validateEmail(email) == false) {
        return res.status(400).json({ message: "give a valid email Addreess" })
    }
    let task
    const list = {
        email: email,
        pending: true
    }
    var id;

    // scheduling email time
    try {
        let time = new Date();
        let newSecond = time.getSeconds() + 3
        let newMinute = time.getMinutes() + parseInt(req.body.minute)
        console.log(newMinute);
        let newHour = time.getHours() + parseInt(req.body.hour)
        console.log(newHour)
        task = cron.schedule(`${newSecond} ${newMinute} ${newHour} * * *`, async () => {

            info = await transporter.sendMail({
                from: req.body.from, // sender address
                to: req.body.email, // list of receivers
                subject: req.body.subject, // Subject line
                html: req.body.text // html body
            });
            event.emit('JOB COMPLETED');
            console.log(info)

        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Problem With server" });
    }
    // creating new list of receiver
    List.create(list, (err, item) => {
        if (err) {
            return res.status(400).json({ message: err })
        }
        else {
            id = item._id.toString()
            console.log(id)
            res.status(200).json({ message: "Mail will be Sent to Selected users in Scheduled Time" })
        }
    })

    event.on('JOB COMPLETED', async () => {
        console.log('Job done!');
        const updated = {
            email: email,
            pending: false
        }
        const updateList = await List.findByIdAndUpdate(id, updated, { new: true })
        console.log(updateList)
        task.stop();
    });


}
// For showing data

const showAll = async (req, res) => {
    const list = await List.find()
    res.status(200).send(list)
}

// For Logout

const Logout = async (req, res) => {
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).json({ message: "Logout Done" })
}


// Routing
router.route('/signup')
    .post(signUp)
router.route('/login')
    .post(login)
router.route('/send')
    .get(auth, getData)
router.route('/sendmail')
    .post(sendMail)
router.route('/show')
    .get(showAll)
router.route('/logout')
    .get(Logout)

module.exports = router;