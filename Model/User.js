const { required } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique : true
        
    },
    phone:{
        type:String,
        required : true
    },
    profile:{
        type:String,
        required : true
    },
    password:{
        type:String,
        required : true
    },

})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel