var mongoose =require('mongoose');

let eventSchema=mongoose.Schema({
  
    title:String,
    desc:String,
    price:Number,
    date:String
});

module.exports=mongoose.model('event',eventSchema);