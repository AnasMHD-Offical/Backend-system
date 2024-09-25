const AdminModel = require("../Model/Admin")
const UserModel = require("../Model/User")
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

const getUsers = async (req,res)=>{
    try {
        const users = await UserModel.find()
        console.log(users);
        res.status(200).json({message:"Users data fetched successfully" , success : true , users})
        
        
    } catch (error) {
        console.log(error);
        
    }
}
const addUser = async (req,res)=>{
    try {
        console.log(req.body);
        
        const { email, name, password, phone } = req.body
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

const editUser = async (req,res)=>{
    try {
        const { id, name, email, password, phone } = req.body;
        const profilePic = req.file ? req.file.path : ""

        console.log(req.body, profilePic);

        const user = await UserModel.findById(id)
        if (!user) {
            res.status(404).json({ message: "User not found", success: false })
        }

        if (email && email !== user.email) {
            const EmailExist = await UserModel.findOne({ email })
            if (EmailExist) {
                res.status(400).json({ message: "Email already exist try new one" })
            }
        }

        // check there is any data updated then it only update the purticular one
        let updates = false;

        if (name && name !== user.name) {
            user.name = name
            updates = true
        }

        if (email && email !== user.email) {
            user.email = email
            updates = true
        }

        if (phone && phone !== user.email) {
            user.phone = phone
            updates = true
        }

        // Comparing password with updated one
        const isPasswordSame = bcrypt.compareSync(password, user.password)
        // console.log(isPasswordSame);

        if (password && !isPasswordSame) {
            user.password = await bcrypt.hash(password, 10)
            updates = true
        }

        if (profilePic && profilePic !== user.profile) {
            user.profile = profilePic
            updates = true
        }


        if (!updates) {
            return res.status(200).json({ message: "No changes found" , success : true })
        }

        const updatedUser = await user.save()

        res.status(200).json({ message: "Updated user details successfully", success: true, UserData: { name: updatedUser.name, email: updatedUser.email, phone: updatedUser.phone, profile: updatedUser.profile } })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong (Internal server error)", error, success: false })
        console.log(error);

    }
}
module.exports = {
    signup,
    login,
    logout,
    getUsers,
    addUser,
    editUser
}