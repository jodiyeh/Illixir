const puppeteer = require("puppeteer-extra"); // imports

puppeteer.launch({
  headless: true, // headless determines if a popup window shoes up
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/coronavirus/");
  page.waitForSelector(".maincounter-number").then(async function(){
    const totalCases = await page.$eval(".maincounter-number span", element => element.innerHTML);
    console.log(totalCases);
  })
}).catch(error => {
  console.log(error);
})
