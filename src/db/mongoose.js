const mongoose = require("mongoose")

const username = 'admin';
const password = 'pass'
const connectionURL=`mongodb://127.0.0.1:27017/task-manager-api`;
//const databaseName = 'task-manager';


mongoose.connect(connectionURL,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, auth:{authSource:"admin", user: username,password,useMongoClient: true}})