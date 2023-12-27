const mongoose = require('mongoose')
// const {Schema , model} = mongoose

const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String

})
const User = mongoose.model("User", userSchema)

module.exports = User;