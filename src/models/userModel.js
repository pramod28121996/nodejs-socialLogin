const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true
    },
  
    userGender:{
        type:String,
        required:true
    },
    userAddress:{
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        default: "admin"
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: String,
        default: "admin"
    },
    updatedDate: {
        type: Date,
        default: Date.now
    },
    isDelete:{
        type:Boolean,
        default:false
    }
})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel