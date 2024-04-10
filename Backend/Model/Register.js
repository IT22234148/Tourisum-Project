const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  regiSchema =new Schema({
    Firstname:{
        type:String,//datatype
        required:true,//validate
    },
    Lastname:{
        type:String,//datatype
        required:true,//validate
    },
    Age:{
        type:Number,//datatype
        required:true,//validate
    },
    Country:{
        type:String,//datatype
        required:true,//validate
    },
    Email:{
        type:String,//datatype
        required:true,//validate
    },
    Password:{
            type:String,//datatype
            required:true,//validate    
    },

});

module.exports = mongoose.model(
    "Register",//filename
    regiSchema// functionname

)