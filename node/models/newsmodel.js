const mongo=require('mongoose');

var newsmodeel=mongo.Schema({
    title:{type:String},
    source:{type:String},
    photo:{type:String},
    information:{type:String}
});
module.exports=newsmodeel