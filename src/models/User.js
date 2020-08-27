const mongoose = require('mongoose')
const validator = require('validator');

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(value.length<6){
                throw new Error('password lower then 6')
            }
            if(value.toLowerCase().includes("password")){
                throw new Error('password cannot contain the word "password"')
            }
        },
    },
    age: {
        type: Number,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        },
        default: 0
    },
    email: {
        type: String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid')
            }
        },
        trim: true,
        lowercase: true

    }
})

module.exports = User;