const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();



app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));



mongoose.connect("mongodb://localhost:27017/samsDB",{
  useNewUrlParser:true,
useUnifiedTopology: true
});
const userSchema =(
  {
    email:String,
    password:String
  }
);

const User = new mongoose.model("User",userSchema);



app.get("/",function(req,res){
res.render("index.html");
});

app.get("/login",function(req,res){
res.render("login");
});

app.get("/register",function(req,res){
res.render("register");
});

app.post("index.html",function(req,res){
const newUser =new User({
  email:req.body.username,
  password:req.body.password
});
newUser.save(function(err){
  if (err) {
    console.log(err);
  }
  res.render("index.html");
});
});






app.listen(3000,function(){
  console.log("server is running on port 3000");
});
