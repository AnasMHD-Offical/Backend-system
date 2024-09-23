const UserModel = require("../Model/User")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const userModel = require("../Model/User")


const signup = async (req, res) => {
    try {
        const { email, name, password, phone} = req.body
        const profile = req.file.path
         
        console.log(req.body);
        console.log(profile);
        
    

        const userExist = await UserModel.findOne({ email })
        if (userExist) {
            return res.status(409).json({ message: "User is already exist", success: false })
        }
        console.log(userExist);
        
        const hasedpassword = await bcrypt.hash(password, 10)
        const newUser = new UserModel({ name, email, password: hasedpassword, phone, profile })
        await newUser.save()
        console.log(newUser);
        
        res.status(201).json({ message: "Signup successfully", success: true, newUser })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong (Internal server error 500)", success: false })
    }
}

const login = async (req, res) => {
    try {
        const { email , password} = req.body
        const userExist = await UserModel.findOne({ email })
        console.log(email);
        
        console.log(userExist);
        if (!userExist) {
            return res.status(409).json({ message: "User is not exist,Try another or Sign up ", success: false })
        }
        const isPasswordTrue = await bcrypt.compare(password,userExist.password)
        console.log(isPasswordTrue);
        
        if(!isPasswordTrue){
            return res.status(403).json({message:"Email or password is wrong . Try again" , success:false})
        }
        const token = JWT.sign({ id: userExist._id, name: userExist.name }, process.env.JWT_secret, {
            expiresIn: "24h"
        })
        console.log(token);
        res.status(200).json({ message: "Login successfully", success: true , token, UserData: { name: userExist.name, email: userExist.email, phone: userExist.phone , profile:userExist.profile, id:userExist._id } })
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
          res.status(200).json({ message: "Logout Successfully" , success:true});
    } catch (error) {
        res.status(500).json({message : "Something went wrong (Internal server error)" , error , success : false})
    }
}

const getUser = async (req,res) =>{
    const data = await userModel.findOne(req.id).select("name email profile phone password")
    if(!data){
        res.status(500).json({message : "User not Found" , success : false})
    }
    res.status(200).json({ message: "user data fetch successfully" , success:true , data});
}
const editUser = async (req,res) =>{
    try {
        const { id, name, email, password , phone } = req.body;
        const profilePic = req.file ? req.file.path : ""
        console.log(req.body);
        
    } catch (error) {
        res.status(500).json({message : "Something went wrong (Internal server error)" , error , success : false})
        console.log(error);
        
    }
}
module.exports = {
    signup,
    login,
    logout,
    editUser,
    getUser
}