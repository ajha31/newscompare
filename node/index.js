const puppeteer=require('puppeteer');

const express=require('express');

const dbconnect=require('./config/mconnect');
const model=require('./models/newsmodel');

//const zee =require('./news files/zeenews');
//const ndtv=require('./news files/ndtv');
//const indiatv=require('./news files/indiatv');

const app=express()
app.use('/all',require('./config/allnews'));
app.use('/single',require('./config/singlenews'));

app.listen(3000,console.log('apps started on port 3000'));;