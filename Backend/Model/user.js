const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Firstname: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Country: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('users', userSchema);
module.exports = userModel;
