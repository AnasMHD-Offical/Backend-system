const mongoose = require("mongoose")
const mongodb_url = process.env.MONGODB_URL

const db_connect = async ()=>{
    try {
        const userData = await mongoose.connect(mongodb_url)
        if(userData){
            console.log(("..Mongodb connection established.."));
        }else{
            console.log("Something went wrong with connectiong mongodb");
        }
    } catch (error) {
        console.log(error,message);
        
    }
}

module.exports = db_connect