
const puppeteer=require('puppeteer');
const mongoose=require('mongoose');

const newsmodeel = require('../models/newsmodel');
let news = mongoose.model('news', newsmodeel, 'india today');
let as=require('../config/app')
let asc=new as()
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
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await preparePageForTests(page);

  await page.goto(`https://www.indiatoday.in/topic/${searchterm}`,{waitUntil:"networkidle2",timeout:0});
  await asc.autoScroll(page);

 const textContent = await page.evaluate((search) => {
  let a=document.querySelector('.view-content').children[0];
  let b=[];
  for( let i=0;i<10;i++){
  let d={
      heading:search,
      topicNo:i,
      title:
      {
      link:a.children[i].children[2].children[0].children[0].children[0].href,
      text:a.children[i].children[2].children[0].children[0].children[0].innerText
      },
      source:{
        link:`https://www.indiatoday.in`,
          text: a.children[i].children[4].innerText 
      },
      photo:a.children[i].children[0].children[0].children[0].src,
      information:a.children[i].children[3].innerText

      }
  b.push(d);
  };
  return b;
 },searchterm);
 
 await browser.close();
 // save multiple documents to the collection referenced by Book Model
await news.collection.insertMany(textContent, function (err, docs) {
  if (err){ 
  return console.error(err);
  } else {
  console.log("Multiple documents inserted to india today");
  }
  });
  
 module.exports=textContent;
})();