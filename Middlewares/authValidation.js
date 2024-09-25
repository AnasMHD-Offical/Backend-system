const joi = require("joi")

// It automatically validate the login req.body and pass to the usercontroller Login 
const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$')).required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Something Went Wrong!.Check your email or password", success: false, error: error })
    }
    next()
}

module.exports = {
    loginValidation,
}