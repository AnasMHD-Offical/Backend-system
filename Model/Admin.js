const { required } = require("joi")
const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    profile:{
        type:String,
        required : true
    },
    password: {
        type: String,
        required: true,
    },
    IsAdmin: {
        type: Boolean,
        required: true,
        default:1
    },
})
const AdminModel= mongoose.model("admins",adminSchema )

module.exports = AdminModel