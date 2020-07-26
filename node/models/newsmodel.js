const mongo=require('mongoose');

var newsmodeel=mongo.Schema({
    heading:{type:String},
    topicNo:{type:Number},
    title:{type:Object},
    source:{type:Object},
    photo:{type:String},
    information:{type:String}
});

module.exports=newsmodeel
