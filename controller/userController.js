const User=require("../models/user.js")
module.exports.CreateForm=(req,res)=>{
  res.render("./userR/signUp.ejs")
}

module.exports.signUp=async(req,res,next)=>{
 try{
  let {username,email,password}=req.body;
 let data=new User({email,username});
 const UserSL= await User.register(data,password);
req.login(UserSL,(err)=>{
  if(err){
    return next(err);
  }
  req.flash("success","Finally,You succussfully login on your new page");
  res.redirect("/listing");
})
 
 }
 catch(err){
  req.flash("success",`${err}`);
  res.redirect("/signUp");
 }
}

module.exports.login=(req,res)=>{
  res.render("./userR/login");
};

module.exports.loginPost=(req,res)=>{
  console.log(res.locals.RedirectUrl)
  let Redirect=res.locals.RedirectUrl || "/listing";
res.redirect(Redirect);
}


module.exports.destroyUser=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","Loggged you logout!");
    res.redirect("/listing");
  })
}