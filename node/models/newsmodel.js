const mongo=require('mongoose');

var newsmodeel=mongo.model('news',{
    title:{type:String},
    source:{type:String},
    photo:{type:String},
    information:{type:String}
},'zeenews')
module.exports=newsmodeel