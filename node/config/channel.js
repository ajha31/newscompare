const express=require('express')
const router=express.Router();
const mongoose=require('mongoose');
const scema=require('../models/channelmoddel')

const chanells=mongoose.model(' News',scema,'indexes');
//for getting the news chanells
router.get('/:type',(req,res)=>{
    chanells.find({"type":`${req.params.type}`},(err,result)=>{
        if(err) console.log(err);
        res.send(result);
    })   
})

module.exports=router;