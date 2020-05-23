const puppeteer = require("puppeteer-extra"); // imports

puppeteer.launch({
  headless: true, // headless determines if a popup window shoes up
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/coronavirus/");
  page.waitForSelector(".maincounter-number").then(async function(){
    // const totalCases = await page.$eval(".maincounter-number span", element => element.innerHTML);
    //const groups = await page.evaluate(() => Array.from(document.getElementsByTagName(".maincounter-number"), e => e.textContent));
    //const groups = await page.evaluate(() => [...document.querySelector('.maincounter-number').classList]);
    var mainCounterNumbers = []
    let group = await page.$$('.maincounter-number')
      for (let el of group) {
        let name = await el.$eval(('span'), node => node.innerText.trim());
        //console.log(name)
        mainCounterNumbers.push(name);
      }
    console.log("Coronavirus Data");
    console.log("Total Cases: " + mainCounterNumbers[0]);
    console.log("Total Deaths: " + mainCounterNumbers[1]);
    console.log("Total Recovered: " + mainCounterNumbers[2]);
  })
}).catch(error => {
  console.log(error);
})
