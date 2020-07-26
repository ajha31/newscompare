const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const scema=require('../models/newsmodel');

const zee=mongoose.model('news',scema,'zeenews');
const ndtv=mongoose.model('news',scema,'ndtv');
const intv=mongoose.model('news',scema,'indiatv');
const quint=mongoose.model('news',scema,'quint');
const ie=mongoose.model('news',scema,'indian express');
const abp=mongoose.model('news',scema,'abp');
const rb=mongoose.model('news',scema,'republic bharat');
const it=mongoose.model('news',scema,'india today');
const news18=mongoose.model('news',scema,'news18');

//for geting all news of a single topic from republic bharat
router.get('/republic/:topic',(req,res)=>{
    rb.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});
//for getinfg all news of a single topic from india today
router.get('/indiatoday/:topic',(req,res)=>{
    it.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});
//for geting all news of a single topic from news18
router.get('/news18/:topic',(req,res)=>{
    news18.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});

//for geting all news of a single topic from quint
router.get('/quint/:topic',(req,res)=>{
    quint.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});
//for getinfg all news of a single topic from indian express
router.get('/indian%20express/:topic',(req,res)=>{
    ie.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});
//for getinfg all news of a single topic from abp
router.get('/abp/:topic',(req,res)=>{
    abp.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});

//for getinfg all news of a single topic from zee news
router.get('/zeenews/:topic',(req,res)=>{
    zee.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});

//for getinfg all news of a single topic from ntdv 
router.get('/ndtv/:topic',(req,res)=>{
    ndtv.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});

//for getinfg all news of a single topic from india tv
router.get('/indiatv/:topic',(req,res)=>{
    intv.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err)console.log(JSON.stringify(err));
         res.send(result);
    });
});


module.exports=router;