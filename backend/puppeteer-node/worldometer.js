const puppeteer = require("puppeteer-extra"); // imports

puppeteer.launch({
  headless: true, // headless determines if a popup window shoes up
}).then(async browser => {
  const page = await browser.newPage();
  await page.goto("https://www.worldometers.info/coronavirus/");
  page.waitForSelector(".maincounter-number").then(async function(){
    // const totalCases = await page.$eval(".maincounter-number span", element => element.innerHTML);
    const groups = await page.evaluate(() => Array.from(document.getElementsByTagName("maincounter-number"), e => e.textContent));
    console.log(groups[0]);
    console.log(groups[1]);
    console.log(groups[2]);
  })
}).catch(error => {
  console.log(error);
})
