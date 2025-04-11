const express=require("express");
const users=require("./router/user.js")
const posts=require("./router/post.js");
const session=require("express-session");
const app=express();

app.use(session({secret:"SuperSecretString"}));
app.get("/",(req,res)=>{
  res.send("Heloguys this is a root page ");
});


const port=3001;
app.listen(port,()=>{
  console.log('Server is running on port no 3001');
  
})


