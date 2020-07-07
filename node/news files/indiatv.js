const puppeteer=require('puppeteer');
const searchterm='covid';
//india news scrapping

(async ()=>{
    let url=`https://www.indiatvnews.com/topic/${searchterm}/news`;
    let browser= await puppeteer.launch({headless:false});
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
    console.log(data);
   await browser.close();
   module.exports=data
    
})();