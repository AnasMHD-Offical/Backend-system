const joi = require("joi")

// It automatically validate the signup req.body and pass to the usercontroller signup 
const signupValidation = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(3).max(100).regex(/^[a-z A-Z]+$/).required(),
        email: joi.string().email().required(),
        phone: joi.string().min(10).max(10).required(),
        // profile: joi.any().required(),
        password: joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$')).required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad request", success: false, error })
    }
    next()
}
// It automatically validate the login req.body and pass to the usercontroller Login 
const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().pattern(new RegExp('^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$')).required()
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: "Bad request", success: false, error })
    }
    next()
}

module.exports = {
    signupValidation,
    loginValidation,
}