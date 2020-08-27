const mongodb = require('mongodb');

const {MongoClient, ObjectID} = mongodb

const connectionURL='mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';
const username = 'admin';
const password = 'pass'

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp())



MongoClient.connect(connectionURL,{useNewUrlParser: true,auth: {user: username, password} },(error,client)=>{
    if(error){
        return console.log('unable to connect');
    }
    const db = client.db(databaseName);


    
    // set updateOne
     db.collection('users').updateOne({name: "Tal5"},{$set: {age: 70}}).then((results)=>{
         if(results.modifiedCount===1){
             // modified!
         }
     }).catch((error)=>{
        console.log(error);
     })

     db.collection('users').updateOne({name: "Tal5"},{$inc: {age: 1}}).then((results)=>{
        if(results.modifiedCount===1){
            // modified!
        }
    }).catch((error)=>{
       console.log(error);
    })

    //db.collection('users').updateMany({},{$inc: {age:100}})
    db.collection('users').deleteMany({age: {
        $in: [22]
    }   }).then(()=>{
        console.log("success")
    }).catch(()=>{
        console.log("error")
    })


     return;

    // FIND MANY by using cursor bring all data (you can use count instead of toArray)
    db.collection('users').find({age: 34}).toArray((error, users)=>{
        console.log(users);
    })


     // FIND ONE BY _ID
    // db.collection('users').findOne({_id: new ObjectID("5f44d7b8f573d03274790b72") },(error,user)=>{
    //     if(error){
    //         return console.log('unable to fetch');
    //     }
    //     console.log(user);
    // }

    //  // find one
    //  db.collection('users').findOne({name: 'Tal',age:38},(error,user)=>{
    //     if(error){
    //         return console.log('unable to fetch');
    //     }
    //     console.log(user);
    // })

    // INSERT ONE

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Tal5',
    //     age: 35
    // },(error, result)=>{
    //     if(error){
    //         return console.log('unable to insert user');
    //     }
    //     console.log(result.ops)
    // })

    // INSERT MANY
    //    db.collection('users').insertMany([{
    //             name: 'user1',
    //             age: 20
    //         },{
    //             name: 'user2',
    //             age: 22
    //         }
    //         ],(error,results)=>{
    //         if(error){
    //             return console.log('unable to add many')
    //         }
    //         console.log(results.ops);
    //     })

    // db.collection('task').insertMany([{
    //     description: 'description1',
    //     completed: false
    // },{
    //     description: 'description2',
    //     completed: true
    // }
    // ],(error, results)=>{
    //     if(error){
    //         console.log('unable to add 3 task');
    //     }

    //     console.log(results.ops)
    // })

    console.log(" connected correctlly")
} )