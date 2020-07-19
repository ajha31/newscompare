const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');

const scema=require('../models/newsmodel');

const zeemodel=mongoose.model('news',scema,'zeenews');
const itvmodel=mongoose.model('news',scema,'indiatv');
const ndtvmodel=mongoose.model('news',scema,'ndtv');


//for getting the first  articles on a topic from zeenews
router.get('/zeenews',(req,res)=>{
    zeemodel.find({"topicNo":1},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    });
});


//for getting the first  articles on a topic from ndtv
router.get('/ndtv',(req,res)=>{
    ndtvmodel.find({"topicNo":1},(err,result)=>{
        if (err) console.log(JSON.stringify(err));
        res.send(result);
    });
});

//for getting the first articles on a topic from indiatv
router.get('/indiatv',(req,res)=>{
    itvmodel.find({"topicNo":1},(err,result)=>{
        if (err) console.log(JSON.stringify(err));
        res.send(result);
    });
});




module.exports=router;