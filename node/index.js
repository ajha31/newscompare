const puppeteer=require('puppeteer');
const express=require('express');
const path=require('path');
const cors=require('cors');
const dbconnect=require('./config/mconnect');
const app=express();
app.use(cors());

//routerlinks
app.use('/all',require('./config/allnews'));
app.use('/single',require('./config/singlenews'));
app.use('/channels',require('./config/channel'));
app.use('/topics',require('./config/topics'));

app.use(express.static(path.join(__dirname,'public')));

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'))
})

let heading=require('./config/headings');
let he= new heading()
let scrapper=require('./config/newscollector')
let sc=new scrapper();
let interval=1000*60*60;

const start=async ()=>{
  await  he.sheading();
  await sc.constart().catch((err) =>console.log(err) );
 await sc.modstart().catch((err) =>console.log(err) );
  await sc.libstart().catch((err) =>console.log(err) );
  console.log('set compleated');
}
// setInterval(() => {
//   start().catch(console.error()) ;
// }, interval);

start().catch(console.error()) ;



const port=process.env.PORT || 3000
const server=app.listen(port,()=>{
  console.log('apps started on port '+ port);
});

