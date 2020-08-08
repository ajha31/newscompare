const puppeteer=require('puppeteer');

const express=require('express');
const cors=require('cors');

const dbconnect=require('./config/mconnect');

const app=express();
app.use(cors());

//const indiatv=require('./news files/indiatv');
//const zee =require('./news files/zeenews');
//const ndtv=require('./news files/ndtv');
//const quint=require('./news files/quint');
//const indianExpress=require('./news files/indian express');
//const abp=require('./news files/abp');
//const republic=require('./news files/republic bharat')
//const news18=require('./news files/news18')
//const indiatoday=require('./news files/indiatoday')

app.use('/all',require('./config/allnews'));
app.use('/single',require('./config/singlenews'));
app.use('/channels',require('./config/channel'));

app.listen(3000,console.log('apps started on port 3000'));