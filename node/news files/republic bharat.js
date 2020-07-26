const puppeteer=require('puppeteer');
const mongoose=require('mongoose');

const newsmodeel = require('../models/newsmodel');
let news = mongoose.model('news', newsmodeel, 'republic bharat');
let heading=require('../config/headings')

let searchterm=heading;

// This is where we'll put the code to get around the tests.
const preparePageForTests = async (page) => {
// Pass the User-Agent Test.
const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
await page.setUserAgent(userAgent);
}

(async () => {
 
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await preparePageForTests(page);
  
   await page.goto(`https://www.republicworld.com`,{waitUntil:"networkidle2",timeout:0});
   await page.click('.ham-search-icon-trigger');
   await page.keyboard.type(searchterm);
   await page.click('#search-button-trigger')
   
  await page.waitFor(3000)

  await page.evaluate(()=>{
    let scrollableSection = document.querySelector('#searchBoxResultsScrollContainer');
    scrollableSection.scrollTop = scrollableSection.offsetHeight;
  })
await page.waitFor(3000)
   const textContent= await page.evaluate( (search) =>{
    
    let a=document.querySelector('#searchBoxResultsContainer');
    let b=[]
    for( let i=0;i<10;i++){
    let d={
        heading:search,
        topicNo:i,
        title:
        {
        link:a.children[i].children[1].children[0].href,
        text:a.children[i].children[1].children[0].innerText
        },
        source:{
          link:`https://www.republicworld.com`,
            text:a.children[0].children[1].children[1].innerText
        },
        photo:a.children[i].children[0].children[0].children[0].src,
        information:a.children[i].children[1].children[0].children[1].innerText
        }
    b.push(d);
    };
    return b
 }, searchterm);

 await browser.close()  
   
   
  //save multiple documents to the collection referenced by Book Model
  await news.collection.insertMany(textContent, function (err, docs) {
    if (err){ 
    return console.error(err);
    } else {
    console.log("Multiple documents inserted to republic bharat");
    }
    });
    
module.exports=textContent;

})();