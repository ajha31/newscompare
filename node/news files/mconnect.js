const mongo=require('mongoose')

mongo.connect('YOUR URL',{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(!err)
    console.log('Mongo db connected');
    else
    console.log(JSON.stringify(err,undefined,2));
})
module.exports=mongo;
