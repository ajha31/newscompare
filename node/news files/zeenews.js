const puppeteer=require('puppeteer');
const searchterm='covid';

// //zee news scrapping
// (async ()=>{
//     let url=`https://zeenews.india.com/google?search=${searchterm}`;
//     let browser= await puppeteer.launch();
//     let page=await browser.newPage();
//     await page.goto(url,{waitUntil:'domcontentloaded'});
//     await page.waitForSelector('.gsc-expansionArea');
//    let data= await page.evaluate(()=>{
//         let a=document.querySelector('.gsc-expansionArea');
//         let b=[]
//         for( let i=0;i<10;i++){
    
//         let d={
//             title:a.children[i].children[0].children[0].children[0].innerHTML,
//             source:a.children[i].children[0].children[1].children[0].innerText,
//             photo:a.children[i].children[0].children[2].children[0].children[0].children[0].innerHTML,
//             information:a.children[i].children[0].children[2].children[1].innerText
//             }
//         b.push(d);
//         };
//         return b
//     })
//     console.log(data);
//    await browser.close();
//    module.exports=data;
// })();



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

 // await page.setRequestInterception(true);
 await page.goto(`https://zeenews.india.com/google?search=${searchterm}`,{waitUntil:'networkidle2'});

 const textContent = await page.evaluate(() => {

    let a=document.querySelector('.gsc-expansionArea');
        let b=[]
        for( let i=0;i<10;i++){
    
        let d={
            title:a.children[i].children[0].children[0].children[0].innerHTML,
            source:a.children[i].children[0].children[1].children[0].innerText,
            photo:a.children[i].children[0].children[2].children[0].children[0].children[0].innerHTML,
            information:a.children[i].children[0].children[2].children[1].innerText
            }
        b.push(d);
        };
        return b
 });
  console.log(textContent);

  browser.close();
})();