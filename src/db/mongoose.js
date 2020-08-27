const mongoose = require('mongoose');
const validator = require('validator');

const username = 'admin';
const password = 'pass'
const connectionURL=`mongodb://127.0.0.1:27017/task-manager-api`;
//const databaseName = 'task-manager';


mongoose.connect(connectionURL,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, auth:{authSource:"admin", user: username,password,useMongoClient: true}})

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
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
        required: true,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number')
            }
        }
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

const user1 = new User({age: 40,name: 'tal', email: 'TAL@tal.com', password: "141"}).save().then(()=>{
    console.log("success")
}).catch((error)=>{
    console.log("error")
    console.log(error);
})



const Task = mongoose.model('task',{
    description: {
        type: String,
        required: true,
        trim: true
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

const task1 = new Task({description: '  my first description243', completed: true});
task1.save().then(()=>{
    console.log(task1)
}).catch((error)=>{
    console.log(error)
})
const task2 = new Task({description: 'my second description'});
task2.save().then(()=>{
    console.log(task2)
}).catch((error)=>{
    console.log(error)
})
