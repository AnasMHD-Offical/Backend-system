const router = require("express").Router()
const { upload } = require("../utils/multer")
const { login, signup, logout, editUser, getUser } = require("../Controller/UserController")
const { signupValidation, loginValidation } = require("../Middlewares/authValidation")

router.post("/login", loginValidation, login)
router.post("/signup", upload, signup)
router.post("/logout", logout)
router.put("/edit", editUser)
router.get("/user", getUser)
router.get("/home"),

    module.exports = router