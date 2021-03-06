const express = require('express')
//------------------------------------importing from phase 03
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
//------------------------------------------------------------
//----------------------importing from phase 05 for validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
//---------------------------------------------------------------
const router = express.Router();

//validation of user creation signup------------------------
const validateSignup = [
    check('email')
        .isEmail()
        .withMessage('Invalid email'),
    check('firstName')
        .exists()
        .isAlphanumeric()
        .withMessage('First name is missing or contains invalid characters (only allowed alphanumeric characters)'),
    // check('firstName')
    //     .isAlpha()
    //     .withMessage('First name must contain letters only'),
    check('lastName')
        .exists()
        .isAlphanumeric()
        .withMessage('Last name is is missing or contains invalid characters (only allowed alphanumeric characters)'),
    // check('lastName')
    //     .isAlpha()
    //     .withMessage('Last name must contain letters only'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];
//--------------------------------------------------------

// Sign up
router.post(
    '/signup',
    validateSignup, //added in phase 5 to validate signup inputs
    async (req, res, next) => {
        const { email, password, firstName, lastName } = req.body;

        const checkUser = await User.findOne({
            where: {
                email: email
            }
        })

        //check if user with the same email exists
        if (checkUser) {
            let err = new Error("User already exists")
            err.status = 403;
            err.errors = {
                "email": "User with that email already exists"
            }
            return next(err)

            // res.status(403);
            // return res.json({
            //     message: "User already exists",
            //     statusCode: res.statusCode,
            //     errors: {
            //         email: "User with that email already exists"
            //     }
            // })
        }

        const user = await User.signup({ email, firstName, lastName, password });

        let returnedUser = user.toJSON();

        let token = await setTokenCookie(res, user);

        returnedUser.token = token

        return res.json(returnedUser);
    }
);

module.exports = router;
