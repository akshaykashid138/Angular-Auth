const express=require('express');
const jwt=require("jsonwebtoken")
const router=express.Router();

var User=require('../models/user');




//middlewar eto verify token

function verifytoken(req,res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }

    let token=req.headers.authorization.split(' ')[1]

    if(token==='null')
    {
        return res.status(401).send('Unauthorized request')

    }

    let payload=jwt.verify(token,'secretKey')

    if(!payload){
        return res.status(401).send('Unauthorized request')

    }

    req.userId=payload.subject
    next()
}

router.get('/',function(req,res){
    res.send("from api");
})

//register user

router.post('/register',function(req,res){
    let userData=req.body;
    let user=new User(userData);
    user.save(function(err,registeredUser){
        if(err){
            console.log(err);
        }
        else{
            let payload={subject:registeredUser._id}
            let token =jwt.sign(payload,'secretKey')
            res.status(200).send({token});
        }
    }
) })

//login api

router.post('/login',function(req,res){

    let userData=req.body;
    User.findOne({email:userData.email},function(err,user){
        if(err){
            console.log(err);
        }
        else{
            if(!user){
                res.status(401).send("Invalid email");
            }
            else if(user.password!==userData.password){
                res.status(401).send("Invalid Password");
            }
            else{
                let payload={subject:user._id}
            let token =jwt.sign(payload,'secretKey')
                res.status(200).send({token});
            }
        }
    })
})

//events
router.get('/events',function(req,res){
    let events=[
        {
            "_id":"1",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"

        },
        {
            "_id":"2",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"3",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"4",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"5",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"6",
            "name":"auto expo",
          "desc":"this is demo",
          "date":"12/06/2020"
        },
        {
            "_id":"7",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"8",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        }
    ]
    res.json(events);
})

//special event
router.get('/special',verifytoken,function(req,res){
    let specialEvents=[
        {
            "_id":"1",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"2",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"3",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"4",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"5",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"6",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"7",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        },
        {
            "_id":"8",
            "name":"auto expo",
            "desc":"this is demo",
            "date":"12/06/2020"
        }
    ]
    res.json(specialEvents);
})

module.exports=router;