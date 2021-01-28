const puppeteer = require('puppeteer');

const element_exists = (url, element) => {
  let exists = (async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage(); 
    await page.goto(url); 
    // https://github.com/puppeteer/puppeteer/issues/1149#issuecomment-339020744 
    if (await page.$(element) !== null) { 
      return true; 
    } else {
      return false; 
    }
    // await page.screenshot({path: 'example.png'});
    await browser.close(); 
  })(); 
  return exists; 
} 

exports.element_exists = element_exists; 

const element_count = (url, element) => { // perhaps "element" should be renamed to selector 
  let count = (async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage(); 
    await page.goto(url); 
    // https://codedec.com/tutorials/how-to-get-element-value-in-puppeteer/#:~:text=Puppeteer%20does%20not%20have%20any,element%20with%20the%20same%20selector. 
    _count = await page.$$eval(element, elements => elements.length);
    // console.log(_count); 
    // await page.screenshot({path: 'example.png'});
    await browser.close(); 
    return _count; 
  })(); 
  return count; 
} 

exports.element_count = element_count; 
