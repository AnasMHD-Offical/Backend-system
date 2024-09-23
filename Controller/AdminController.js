const AdminModel = require("../Model/Admin")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")



const signup = async (req, res) => {
    try {
        const { email, name, password, phone } = req.body
        const profile = req.file.path
        // console.log(req.body);

        const AdminExist = await AdminModel.findOne({ email })
        if (AdminExist) {
            return res.status(409).json({ message: "User is already exist", success: false })
        }
        
        const hasedpassword = await bcrypt.hash(password, 10)
        const newAdmin = new AdminModel({ name, email, password: hasedpassword, phone, profile })
        await newAdmin.save()
        console.log(newAdmin);
        
        res.status(201).json({ message: " Admin Signup successfully completed", success: true, newAdmin })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong (Internal server error 500)", success: false })
    }
}

const login = async (req, res) => {
    try {
        const { email,password} = req.body
        const AdminExist = await AdminModel.findOne({ email })
        // console.log(AdminExist);
        if (!AdminExist) {
            return res.status(409).json({ message: "User is not exist,Try another or Sign up ", success: false })
        }
        const isPasswordTrue = await bcrypt.compare(password,AdminExist.password)
        // console.log(isPasswordTrue);
        
        if(!isPasswordTrue){
            return res.status(403).json({message:"Email or password is wrong . Try again" , success:false})
        }
        if(!AdminExist.IsAdmin){
            return res.status(403).json({message:"Unauthorised access",success:false})
        }
        const token = JWT.sign({ id: AdminExist._id, name: AdminExist.name }, process.env.JWT_secret, {
            expiresIn: "24h"
        })
        console.log(token);
        res.status(200).json({ message: "Login successfully", success: true , token, AdminData: { name: AdminExist.name, email: AdminExist.email, phone: AdminExist.phone , profile:AdminExist.profile } })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong (Internal server error 500)", success: false })
    }
}
const logout = async (req,res) =>{
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0),
          });
          res.status(200).json({ message: "Logout Successfully", success:true});
    } catch (error) {
        res.status(500).json({message : "Something went wrong (Internal server error)" , error , success : false})
    }
}

module.exports = {
    signup,
    login,
    logout
}