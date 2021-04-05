const fs = require("fs");
const util = require("util");
const axios = require("axios")
require("dotenv").config();

const BASE_URL = process.env.NODE_ENV === "PRODUCTION" ? "" : "http://localhost:3000/sendmail"
const fs_writeFile = util.promisify(fs.writeFile)

const last_Notice_Id = require("./lastData.json");
console.log("Sdf", typeof last_Notice_Id.lastData);
const { Builder, By, Key, until } = require("selenium-webdriver");

async function selen() {
	let driver = await new Builder().forBrowser("firefox").build();
	try {
		await driver.get("http://210.212.85.155:8082/notices/"); // open this link
		await driver.wait(until.elementsLocated(By.name("login")), 2000); // wait until pivot (i.e login button) is not shown
		await driver
			.findElement(By.name("login"))
			.sendKeys(process.env.USER_ID, Key.TAB); // enter your id
		await driver
			.findElement(By.name("password"))
			.sendKeys(process.env.PASSWORD, Key.ENTER); // enter pass
		//    //*[@id="notice_title_last_Notice_Id"]
		await driver.wait(
			until.elementsLocated(
				By.xpath(`//*[@id='notice_title_${last_Notice_Id.lastData}']`)
			),
			4000
		);

		var pList = new Array(),
			updateList = new Array();

		/*
		 * doasync -is for resolving each and every promise for
		 * recentDataObj
		 * loop to enter the id of all the notice id
		/*
		 * get first element of li
		 * */
		//		for(let i = 0 ;
		const recentDataObj = await driver.findElements(
			By.xpath("//div[@class=' relevant-content']/ul/li/div/div")
		);

		for (var i = 0; i < recentDataObj.length; i++) {
			if (doasync(recentDataObj[i].getAttribute("id")).length != 0) {
				pList.push(doasync(recentDataObj[i].getAttribute("id")));
			}
		}
		Promise.all(pList)
			.then((res) => {
				console.log("there might be an upd" , res )
				return res;
			})
			.then(async (res) => {
				//searching index of lastData
				const op = await new Promise((resolve)=> {
					res.forEach((num,i ) =>{
						if(num == last_Notice_Id.lastData ){
							resolve({index : i -1, res })
						}
					})
				})
				return op ;
			})
			.then((al) => {
				if (al.index === 0) {
					throw "there's no update";
				}else {
					axios.get(`${BASE_URL}`).then((res)=>{
						console.log("res", res)
						if(res.data === "cop" && res.status == 200) {
							const updatedJSON = {
								lastData: al.res[1],
							};
							fs_writeFile('./lastData.json', JSON.stringify(updatedJSON)).then(res => console.log("lastData written")).catch((er)=>{
								throw "cannot be written"
							})
						}
					}).catch((er)=> console.log("axis er", er))
				}
			})
			.catch((er) =>{
				console.log(er)
			})
	} catch (err) {
		console.log(err, "err is try catch");
		await driver.quit();
	}
}

function returnThenValue(updateListArray) {
	console.log(updateListArray, "return; ");
	return updateListArray;
}

function doasync(a) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (a instanceof String || a.length != 0) {
				resolve(a);
			}
		}, 500);
	});
}

selen()
	.then(() => {
		console.log("Running");
	})
	.catch(() => {
		console.log("err");
	});
