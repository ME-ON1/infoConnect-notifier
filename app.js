const fs =require("fs");

const last_Notice_Id = require("./lastData.json") ;

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
	await driver.get("http://210.212.85.155:8082/notices/")
	await driver.wait(until.elementsLocated(By.name('login')),2000)
	await driver.findElement(By.name("login")).sendKeys(process.env.USER_ID, Key.TAB) ;
        await driver.findElement(By.name("password")).sendKeys(process.env.PASSWORD, Key.ENTER)
		//    //*[@id="notice_title_23619"]
        await driver.wait(until.elementsLocated(By.xpath(`//*[@id='notice_title_${last_Notice_Id.last_Notice_Id}']`)),4000)
	/*
	 * get first element of li
	 * */
//		for(let i = 0 ; i )
	const recentDataObj = await driver.findElements(By.xpath("//div[@class=' relevant-content']/ul/li/div/div"))
	console.log(recentDataObj) ;
>>>>>>> parent of e412444 (added update array function)
	var  pList = [] ;
	for(var i = 0 ; i < recentDataObj.length ; i++) {
		if(doasync(recentDataObj[i].getAttribute('id')).length != 0 || strin instanceof String ){
			pList.push(doasync(recentDataObj[i].getAttribute('id')))
		}
	}
	Promise.all(pList).then(res => {
		console.log(res);
		return res ;
	}).then((res) => {
		for(let i = 1 ; i < res.length; i++ ){
			if(res[i] == last_Notice_Id.last_Notice_Id){
				if(i > 1 ){
					console.log("thereis an update")
					return val ;
				}
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
		console.log("NO update");
		return val ;
	}).then((al) =>{
		console.log("sdf", al )
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
