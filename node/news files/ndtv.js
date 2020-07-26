const puppeteer=require('puppeteer');
const mongoose=require('mongoose');
const path=require('path');
const newsmodeel = require('../models/newsmodel');
var news = mongoose.model('news', newsmodeel, 'ndtv');
let heading=require('../config/headings')

let searchterm=heading;


//ndtv scrapping
(async ()=>{
    let url=`https://www.ndtv.com/search?searchtext=${searchterm}`;
    let browser= await puppeteer.launch();
    let page=await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
   let data= await page.evaluate((search)=>{
    let a=document.querySelector('#news_list').children[1].children[0]
    let b=[];
    for( let i=0;i<10;i++){
    let d={
       heading:search,
       topicNo:i,
       title:{
         link:a.children[i].children[0].children[0].href,
         text:a.children[i].children[0].children[0].title
       },
      source:{
         link:'https://www.ndtv.com',
         text:a.children[3].children[1].innerText
        },
       photo:a.children[i].children[2].children[0].getAttribute('src') ,
       information:a.children[i].children[3].innerText
    }
    b.push(d);
  }
    return b;
    },searchterm);
    await browser.close();
  // save multiple documents to the collection referenced by Book Model
  await news.collection.insertMany(data, function (err, docs) {
  if (err){ 
  return console.error(err);
  } else {
  console.log("Multiple documents inserted to ndtv");
  }
  });
    module.exports=data;
})();