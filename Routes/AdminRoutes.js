const router = require("express").Router()
const { login, signup, logout, getUsers, addUser , editUser , deleteUser} = require("../Controller/AdminController")
const usercontroller = require("../Controller/UserController")
const { loginValidation } = require("../Middlewares/authValidation")
const { upload } = require("../utils/multer")

router.post("/login", loginValidation, login)
router.post("/signup", upload, signup)
router.post("/logout", logout)
router.get("/getuser", getUsers)
router.post("/addUser", upload, addUser)
router.patch("/editUser", upload , editUser)
router.delete("/deleteUser/:id",deleteUser)

module.exports = router