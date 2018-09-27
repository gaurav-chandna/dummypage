const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const globalErrorMiddleware = require("./middlewares/appErrorHandler.js");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(globalErrorMiddleware.errorHandler);

let modelPath =require('./models/Blog.js')
let route = require('./route/blog.js');

route.setRoute(app);
app.use(globalErrorMiddleware.notFoundHandler);
url="mongodb://127.0.0.1:27017/blogAppDB"
app.listen(3000 ,() => {
    console.log("app is listening at port 3000")
    let db = mongoose.connect(url, {useNewUrlParser: true});
});
mongoose.connection.on('error',function(err){
    if(err){
        console.log("connection error");
        console.log(err);
    }
})

mongoose.connection.on('open',function(err){
    if(err){
        console.log("there is an error");
        console.log(err);
    }else{
        console.log("connection open sucessfully");
    }
})