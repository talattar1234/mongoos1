const express = require("express");
require('./db/mongoose')

const User = require('./models/User');
const Task = require('./models/Task')




const app = express();
const port = process.env.PORT  | 3000;
app.use(express.json());

app.post('/users',(req,res)=>{
    //res.send('testing')
    const {name, email, password} = req.body;
    const user = new User({name, email, password});

    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((e)=>{
        res.status(400).send(e);
    })
})


app.get('/users/:id',(req,res)=>{
    const {id} = req.params;

    User.findById(id).then((user)=>{
        if(!user){
            return res.status(400).send();
        } 

        res.send(user);
        
        
        
        
    }).catch((e)=>{
        res.status(500).send()
    })
})

app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{
        res.send(users);
    }).catch((e)=>{
        res.status(500).send()
    })
})


app.post('/tasks',(req,res)=>{
    const {description} = req.body;
    const task = new Task({description});
    task.save().then(()=>{
        res.status(201).send(task);
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.listen(port, ()=>{
    console.log("server is up on port " + port)
})
