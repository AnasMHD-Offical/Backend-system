require("dotenv").config()
const express = require("express")
const app = express()
const db_connect = require("./Model/db")
const userRoute = require("./Routes/UserRoutes")
const adminRoute = require("./Routes/AdminRoutes")
const cors = require("cors")
const path  = require("path")
// const { upload } = require("./utils/multer")
db_connect()

const PORT = process.env.PORT || 3000
// app.use(express.urlencoded({extented:true}))
app.use(express.json())
app.use(cors())
// app.set()
app.use(express.static(path.join(__dirname,"utils","uploads")))

app.use("/",userRoute)
app.use("/admin",adminRoute)

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
})
