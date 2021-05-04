
const mongoose = require('mongoose');
var Schema=mongoose.Schema;

userSchema =  new mongoose.Schema({
   	unique_id: Number,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    last:{
    	type: String,
    	required: true,
    	minlength: 2,
    	maxlength: 10
    }
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    confirmPassword: String
});


User= mongoose.model('User', userSchema);

exports.User = User;
