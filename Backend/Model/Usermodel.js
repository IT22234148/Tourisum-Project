const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema =new Schema({
    Firstname:{
        type:String,//datatype
        required:true,//validate
    },
    Lastname:{
        type:String,//datatype
        required:true,//validate
    },
    age:{
        type:Number,//datatype
        required:true,//validate
    },
    country:{
        type:String,//datatype
        required:true,//validate
    },
    Email:{
        type:String,//datatype
        required:true,//validate
    },

});

module.exports = mongoose.model(
    "Usermodel",//filename
    userSchema// functionname

)