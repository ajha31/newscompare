const puppeteer=require('puppeteer');
const mongoose=require('mongoose');

const newsmodeel = require('../models/newsmodel');
var news = mongoose.model('news', newsmodeel, 'ndtv');

const searchterm='covid';
//ndtv scrapping
(async ()=>{
    let url=`https://www.ndtv.com/search?searchtext=${searchterm}`;
    let browser= await puppeteer.launch();
    let page=await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
   let data= await page.evaluate((search)=>{
    let a=document.querySelector('#news_list').children[1].children[0]
    let b=[];
    for( let i=1;i<11;i++){
    let d={
       heading:search,
       topicNo:i,
       title:a.children[i].children[0].innerHTML,
       source:a.children[i].children[1].innerHTML,
       photo:a.children[i].children[2].innerHTML,
       information:a.children[i].children[3].innerText
    }
    b.push(d)
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