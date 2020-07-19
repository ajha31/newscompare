const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const scema=require('../models/newsmodel');

const zee=mongoose.model('news',scema,'zeenews');
const ndtv=mongoose.model('news',scema,'ndtv');
const intv=mongoose.model('news',scema,'indiatv');

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