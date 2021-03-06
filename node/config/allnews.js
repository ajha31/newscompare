const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');

const scema=require('../models/newsmodel');

const zeemodel=mongoose.model('news',scema,'zeenews');
const itvmodel=mongoose.model('news',scema,'indiatv');
const ndtvmodel=mongoose.model('news',scema,'ndtv');
const quint=mongoose.model('news',scema,'quint');
const ie=mongoose.model('news',scema,'indianExpress');
const abp=mongoose.model('news',scema,'abp');
const rb=mongoose.model('news',scema,'republic');
const it=mongoose.model('news',scema,'indiaToday');
const news18=mongoose.model('news',scema,'news18');


//for getting first article from republic bharat 
router.get('/Republic%20World',(req,res)=>{
    rb.find({"topicNo":0},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});
//for getting first article from india today
router.get('/India%20Today',(req,res)=>{
    it.find({"topicNo":0},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});
//for getting first article from news18
router.get('/News18',(req,res)=>{
    news18.find({"topicNo":0},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});

//for getting first article from quint
router.get('/The%20Quint',(req,res)=>{
    quint.find({"topicNo":0},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});

//for getting first article from abp
router.get('/ABP',(req,res)=>{
    abp.find({"topicNo":0},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});

//for getting first article from indian express
router.get('/Indian%20Express',(req,res)=>{
    ie.find({"topicNo":1},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});

//for getting the first  articles on a topic from zeenews
router.get('/Zee%20News',(req,res)=>{
    zeemodel.find({"topicNo":0},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});


//for getting the first  articles on a topic from ndtv
router.get('/NDTV',(req,res)=>{
    ndtvmodel.find({"topicNo":0},(err,result)=>{
        if (err) console.log(JSON.stringify(err));
        res.send(result);
    });
});

//for getting the first articles on a topic from indiatv
router.get('/India%20Tv',(req,res)=>{
    itvmodel.find({"topicNo":0},(err,result)=>{
        if (err) console.log(JSON.stringify(err));
        res.send(result);
    });
});




module.exports=router;