var express=require('express')

var router =express.Router();

const Event=require('../models/events');

//stroring events into db

router.post('/createEvents',function(req,res){
let eventData=req.body;
let events =new Event(eventData);
events.save(function(err,events){
    if(err)
    {
        console.log(err);
    }
    else{
        res.status(200).send(events);
    }
})

})

router.get('/events',function(req,res){
    Event.find(function(err,events){
        if (err){
            console.log(err)
        }
        else{
            res.send(events)
        }
    })
})

module.exports=router;