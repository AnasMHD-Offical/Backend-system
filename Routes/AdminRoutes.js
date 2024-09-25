const router = require("express").Router()
const { login, signup, logout, getUsers, addUser , editUser} = require("../Controller/AdminController")
const usercontroller = require("../Controller/UserController")
const { loginValidation, signupValidation } = require("../Middlewares/authValidation")
const { upload } = require("../utils/multer")

router.post("/login", loginValidation, login)
router.post("/signup", upload, signup)
router.post("/logout", logout)
router.get("/getuser", getUsers)
router.post("/addUser", upload, addUser)
router.patch("/editUser", upload , editUser)

module.exports = router