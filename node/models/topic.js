const mongoose=require('mongoose');


const topics=  mongoose.model('News',{
    type:{type:String},
    name:{type:String},
    logo:{type:String}
},'topics')

module.exports=topics;