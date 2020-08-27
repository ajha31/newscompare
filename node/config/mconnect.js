const mongo=require('mongoose')

mongo.connect('mongodb+srv://aman:aman@cluster0-gq0p1.mongodb.net/news?retryWrites=true&w=majority',{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(!err)
    console.log('Mongo db connected');
    else
    console.log(JSON.stringify(err,undefined,2));
})
module.exports=mongo;
