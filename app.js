require("dotenv").config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bp = require("body-parser") 
const fs =require("fs"); 

const last_Notice_Id = require("./lastData.json") ;
const app = express() 
// view engine setup

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const {Builder,By, Key,until } = require("selenium-webdriver") ;
const documentInitili = (driver) => {
	driver.executeScript("return initialised") ;
}	

(async function example (){

	let driver = await new Builder().forBrowser("firefox").build() ;
	try{
	await driver.get("http://210.212.85.155:8082/notices/")
	await driver.wait(until.elementsLocated(By.name('login')),2000)
	await driver.findElement(By.name("login")).sendKeys(process.env.USER_ID, Key.TAB) ;
        await driver.findElement(By.name("password")).sendKeys(process.env.PASSWORD, Key.ENTER) 
	const lastDataObj = (last_Notice_Id) ;
	const recentDataObj = await driver.findElements(By.xpath("/ul[@class='row']/li[@id='23619']"))
	console.log("tag", recentDataObj) ;
			
	}catch(err) {
		console.log(err)
		await driver.quit() ;
	}
})();

module.exports = app;
