const mongoose=require('mongoose');


const channels=  mongoose.Schema({
    type:{type:String},
    name:{type:String},
    logo:{type:String}
})

module.exports=channels;