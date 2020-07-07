const puppeteer=require('puppeteer');
const mongoose=require('mongoose');

const db=require('./mconnect');
const newsmodeel = require('../models/newsmodel');

var news = mongoose.model('news', newsmodeel, 'indiatv');
const searchterm='covid';
//india news scrapping
(async ()=>{
    let url=`https://www.indiatvnews.com/topic/${searchterm}/news`;
    let browser= await puppeteer.launch();
    let page=await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
    let data= await page.evaluate(()=>{
      a=document.querySelector('.newsListfull')
      b=[]
      
      for( let i=0;i<10;i++){
        
        let d={
           title:a.children[i].children[1].children[0].innerHTML,
           source:a.children[i].children[1].children[1].innerHTML,
           photo:a.children[i].children[0].innerHTML,
           information:a.children[i].children[1].children[2].innerText
        }
        b.push(d)
      } 
      return b;
    })
   await browser.close();
    // save multiple documents to the collection referenced by Book Model
  await news.collection.insertMany(data, function (err, docs) {
    if (err){ 
    return console.error(err);
    } else {
    console.log("Multiple documents inserted to indiatv");
    }
    });
   module.exports=data
    
})();