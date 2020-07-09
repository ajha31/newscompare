const mongo=require('mongoose');

var newsmodeel=mongo.Schema({
    heading:{type:String},
    title:{type:String},
    source:{type:String},
    photo:{type:String},
    information:{type:String}
});
module.exports=newsmodeel