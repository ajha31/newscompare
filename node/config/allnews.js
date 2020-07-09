const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');

const scema=require('../models/newsmodel');

const zeemodel=mongoose.model('news',scema,'zeenews');
const itvmodel=mongoose.model('news',scema,'indiatv');
const ndtvmodel=mongoose.model('news',scema,'ndtv');

//for getting the first two articles on a topic from zeenews
router.get('/zeenews/:topic',(req,res)=>{
    zeemodel.find({"heading":`${req.params.topic}`},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    }).limit(2);
});


//for getting the first two articles on a topic from ndtv
router.get('/ndtv/:topic',(req,res)=>{
    ndtvmodel.find({"title":`${req.params.topic}`},(err,result)=>{
        if (err) console.log(JSON.stringify(err));
        res.send(result);
    }).find(2);
});

//for getting the first two articles on a topic from indiatv
router.get('/indiatv/:topic',(req,res)=>{
    itvmodel.find({"title":`${req.params.topic}`},(err,result)=>{
        if (err) console.log(JSON.stringify(err));
        res.send(result);
    }).find(2);
});

module.exports=router;