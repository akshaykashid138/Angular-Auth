const express=require('express');
const bodyParser=require('body-parser');
var mongoose=require('mongoose');

const cors=require('cors');

const PORT=3000;

const api=require('./Routes/api');
const event=require('./Routes/event');

const app=express();
app.use(cors())

//mongoDB connection code
mongoose.connect("mongodb://127.0.0.1:27017/userAuth",function(err){
  if(err)
  throw err;

  else
  console.log("Connected Successfully....");
})

app.use(bodyParser.json());

app.use('/api',api);
app.use('/',event);

app.get('/',function(req,res){
    res.send('hello from server');

})

app.listen(PORT,function(){
        console.log(`Server started on http://localhost:${PORT}`);
})