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

async function selen (){

	let driver = await new Builder().forBrowser("firefox").build() ;
	try{
		await driver.get("http://210.212.85.155:8082/notices/") // open this link
		await driver.wait(until.elementsLocated(By.name('login')),2000) // wait until pivot (i.e login button) is not shown
		await driver.findElement(By.name("login")).sendKeys(process.env.USER_ID, Key.TAB) // enter your id
		await driver.findElement(By.name("password")).sendKeys(process.env.PASSWORD, Key.ENTER) // enter pass
		//    //*[@id="notice_title_last_Notice_Id"]
		await driver.wait(until.elementsLocated(By.xpath(`//*[@id='notice_title_${last_Notice_Id.last_Notice_Id}']`)),4000)  // getting the location of last_Notice_Id

		// =======================================================================
		/*
		 * get first element of li
		 * */
		const recentDataObj = await driver.findElements(By.xpath("//div[@class=' relevant-content']/ul/li/div/div"))	// getting every notice divs

		var  pList = new Array(),  updateList = new Array() ;

		/*
		 * doasync -is for resolving each and every promise for
		 * recentDataObj
		 * loop to enter the id of all the notice id i
		 * */

		for(var i = 0 ; i < recentDataObj.length ; i++) {
			if(doasync(recentDataObj[i].getAttribute('id')).length != 0 ){
				pList.push(doasync(recentDataObj[i].getAttribute('id')))
			}
		}
		Promise.all(pList).then(res => {
			return res ;
		}).then((res) => {
			for(let i = 1 ; i < res.length; i++ ){
				if(res[i] == last_Notice_Id.last_Notice_Id){
					if(i > 1 ){
						console.log("thereis an update")
						return {index : i - 1, res}  ;
					}
				}
			}

			return {index : -1 , res } ;
		}).then(({index, res} ) =>{
			if(index < 0) {
				throw "no Update";
			}
			for(let i = index ; i > 0 ; i-- ){
				updateList.push(res[i]) ;
			}
			console.log(updateList)
			return returnThenValue(updateList) ;
		})
	}catch(err) {
		console.log(err)
		await driver.quit() ;
	}
}

function returnThenValue(updateListArray) {
	 console.log(updateListArray, "return; ")
	 return updateListArray ;
}

function doasync (a) {
	return new Promise((resolve , reject )=>  {
		setTimeout(()=>{
			if(a instanceof String || a.length != 0){
				resolve(a);
			}
		}, 500)
	})
}


app.get("/main", async (req,res,next )=> {
	const updateList =  await selen() ;
})

app.listen(3005, ()=>{
	console.log("server is running" )
})
module.exports = app;
