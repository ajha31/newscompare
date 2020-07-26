const puppeteer=require('puppeteer');
const mongoose=require('mongoose');

const newsmodeel = require('../models/newsmodel');
let news = mongoose.model('news', newsmodeel, 'indiatv');
let heading=require('../config/headings')

let searchterm=heading;
//india news scrapping
(async ()=>{
    let url=`https://www.indiatvnews.com/topic/${searchterm}/news`;
    let browser= await puppeteer.launch();
    let page=await browser.newPage();
    await page.goto(url,{waitUntil:'domcontentloaded'});
    let data= await page.evaluate((search)=>{
     let a=document.querySelector('.newsListfull');
     let  b=[];
      for( let i=1;i<11;i++){
        let d={
           heading:search,
           topicNo:i,
           title:{
            link:a.children[i].children[1].children[0].children[0].getAttribute('href'),
            text:a.children[i].children[1].children[0].innerText
          },
          source:{
            link:'https://www.indiatvnews.com',
            text: a.children[i].children[1].children[1].innerText 
           },
           photo: a.children[i].children[0].children[0].getAttribute('data-original'),
           information:a.children[i].children[1].children[2].innerText
        }
        b.push(d)
      } 
      return b;
    },searchterm)
   await browser.close();
    // save multiple documents to the collection referenced by Book Model
  await news.collection.insertMany(data,  (err, docs)=>{
    if (err){ 
    return console.error(err);
    } else {
    console.log("Multiple documents inserted to indiatv");
    }
    });
   module.exports=data
    
})();
