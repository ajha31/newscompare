const puppeteer=require('puppeteer');
const express=require('express');
const cors=require('cors');
const dbconnect=require('./config/mconnect');

const app=express();
app.use(cors());

const newscollector=require('./news files/newscollector');
//const heading=require('./config/headings');

app.use('/all',require('./config/allnews'));
app.use('/single',require('./config/singlenews'));
app.use('/channels',require('./config/channel'));

app.listen(3000,console.log('apps started on port 3000'));

