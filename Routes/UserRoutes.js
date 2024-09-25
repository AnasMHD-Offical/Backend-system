const router = require("express").Router()
const { upload } = require("../utils/multer")
const { login, signup, logout, editUser, getUser } = require("../Controller/UserController")
const {loginValidation } = require("../Middlewares/authValidation")

router.post("/login", loginValidation, login)
router.post("/signup", upload, signup)
router.post("/logout", logout)
router.patch("/edit",upload, editUser)
router.get("/user/:id", getUser)
router.get("/home"),

    module.exports = router