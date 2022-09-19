// const { number } = require("joi")
const mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type:String},
    fee: {type:Number, min:20},
    publicKey: {type:String},
})

exports.userModel = mongoose.model("users",userSchema);