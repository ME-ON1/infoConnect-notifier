const fs = require("fs");

const last_Notice_Id = require("./lastData.json");

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
        By.xpath(`//*[@id='notice_title_${last_Notice_Id.last_Notice_Id}']`)
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
    console.log(recentDataObj);

    for (var i = 0; i < recentDataObj.length; i++) {
      if (
        doasync(recentDataObj[i].getAttribute("id")).length != 0 ||
        strin instanceof String
      ) {
        pList.push(doasync(recentDataObj[i].getAttribute("id")));
      }
    }
    Promise.all(pList)
      .then((res) => {
        return res;
      })
      .then((res) => {
        for (let i = 1; i < res.length; i++) {
          if (res[i] == last_Notice_Id.last_Notice_Id) {
            if (i > 1) {
              console.log("thereis an update");
              return { index: i - 1, res };
            }
          }
        }

        console.log("NO update");
        return val;
      })
      .then((al) => {
        console.log("sdf", al);
      });
  } catch (err) {
    console.log(err);
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
