require("dotenv").config()

const mongoose = require("mongoose") ;
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bp = require("body-parser")
const fs =require("fs");

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute = require("./routes/users")

mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser : true ,
	useUnifiedTopology : true
}, (err,res)=>{
	if(err) {
		console.log("problem with db ", err)
	}else {
		console.log("db connected let's rocKK ");
	}
})

app.use("/user",userRoute)

app.listen(3005, ()=>{
	console.log("server is running!! ")
})


