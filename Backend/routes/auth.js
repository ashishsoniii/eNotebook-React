const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// JWT authentication for security b/w client and server
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
var JWT_SECRET = 'Hello Workld';



//Route 1::::: Create a User using: POST "/api/auth/createuser". Doesn.t requre auth . No lOgin required

router.post('/createuser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', ' Enter valid password!').isLength({ min: 5 }),
    body('name', 'Enter a valid name').isLength({ min: 4 }),

],
    async (req, res) => {
        // console.log(req.body);
        // res.send("Hello!");
        // res.send(req.body);
        // const user = User(req.body);
        // user.save();

        // If there are errors then it returns bad request and the eroors!
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // checks wheater user with this email exists!
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exist! Try New Email" })
            }
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);

            // new user creation
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            // console.log(authToken) ;

            res.json({ authToken })

            // .then(user => res.json(user)).catch(err => {
            //     console.log(err)
            //     res.json({ error: 'Please enter a unique value for email', message: err.message })
            // });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error Occured")

        }

    })

//Route 2:::::::::: Authenticate a user usng: POST " /api/auth/login". No login required!


router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password Cannot be Bllank').exists(),

],
    async (req, res) => {

        // if there are errors , return bad request and the errors!
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with corret credentials" });
            }

            const passCompare = await bcrypt.compare(password, user.password);
            if (!passCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });

            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Insternal Server Error");

        }


    });


//Route 3:::::::::: Get Lognin user  request usng: POST " /api/auth/getuser". Login required!

router.post('/getuser', fetchuser, async (req, res) => {


    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password"); //except password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Insternal Server fError");

    }
});


module.exports = router; 