const puppeteer=require('puppeteer');
const mongoose=require('mongoose');

const newsmodeel = require('../models/newsmodel');

var news = mongoose.model('news', newsmodeel, 'zeenews');
  
const searchterm='covid';
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

 await page.goto(`https://zeenews.india.com/google?search=${searchterm}`,{waitUntil:'networkidle2'});

 const textContent = await page.evaluate(() => {

    let a=document.querySelector('.gsc-expansionArea');
        let b=[]
        for( let i=0;i<10;i++){
    
        let d={
            heading:`covid`,
            title:a.children[i].children[0].children[0].children[0].innerHTML,
            source:a.children[i].children[0].children[1].children[0].innerText,
            photo:a.children[i].children[0].children[2].children[0].children[0].children[0].innerHTML,
            information:a.children[i].children[0].children[2].children[1].innerText
            }
        b.push(d);
        };
        return b
 });
 
 await browser.close();
 // save multiple documents to the collection referenced by Book Model
await news.collection.insertMany(textContent, function (err, docs) {
  if (err){ 
  return console.error(err);
  } else {
  console.log("Multiple documents inserted to zeenews");
  }
  });
  
 module.exports=textContent;
})();