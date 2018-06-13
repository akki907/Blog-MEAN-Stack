const express = require('express');
const app = express();
const router = express.Router();
const port = 9000;
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const databaseLink = require('./config/database');
const path = require('path');
const cors = require('cors');
const authentication = require('./routes/authentication')(router);
//dababase connection
mongoose.Promise = global.Promise;

mongoose.connect (databaseLink.url,(err)=>{
    if(err) console.log(err)
    console.log('database is runnung at:'+databaseLink.url);
})

//cors configuration

app.use(cors({origin:'http://localhost:4200'}))

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(morgan('dev'));

app.use(express.static(__dirname + '/Client/dist'))
app.use('/authentication',authentication);
// test
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/Client/dist/index.html'))
})

// ng g component hi --module app

app.listen(port,()=>{
    console.log('server is running at:',port);
})