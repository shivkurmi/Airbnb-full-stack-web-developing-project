if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}
const express=require("express")
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const ExpressError=require("./utils/expressError.js");
const ejsmate=require("ejs-mate");
const path=require("path");
const Listings=require("./Routes/listingRoute.js");
const ReviewsRouter=require("./Routes/reviewRouter.js");
const userRouter=require("./Routes/userRouter.js");
const session =require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalSttategy=require("passport-local");
const User=require("./models/user.js");
const app=express();
 
const mongoURL='mongodb://127.0.0.1:27017/projectShiv';
main().then((res)=>{
  console.log("DB is connected");
}).catch((err)=>{
  console.log(err);  
})
async function  main() {
 await mongoose.connect(mongoURL) ;
}

app.set("view engine",'ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static(path.join(__dirname,"/public")))



app.get("/",(req,res)=>{
  res.send("this is the root page");
});

const sessions={
  secret:"MysuperSecretCode",
  resave:false,
   saveUninitialized:true,
  cookie:{
    expire:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*100,
    httpOnly:true,
  }
}

app.use(session(sessions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalSttategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.error=req.flash("error")
  res.locals.currUser=req.user;
  next();
});
//Listing page Route
app.use("/listing",Listings);

app.use("/review",ReviewsRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
  next(new ExpressError(405,"Page is not exist"));
});

app.use((err,req,res,next)=>{
  let { statuCode=402,message="page is not matching" }=err;
 res.status(statuCode).render("error.ejs",{message});
});
const port=8080;
app.listen(port,()=>{
  console.log(`server is running on port ${port}`);
});