const { session } = require("passport");
const {reviewSchema}=require("./Validation.js");
const listing=require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressError=require("./utils/expressError.js");

module.exports.isLogIn=(req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.RedirectUrl=req.originalUrl;
    req.flash("error","you must be login");
    return res.redirect("/login");
  }
  else{
    next();
  }
}


module.exports.SaveRediectUrl=(req,res,next)=>{
  if(req.session.RedirectUrl)
  {
    res.locals.RedirectUrl=req.session.RedirectUrl;
  }
  next();
}
module.exports.isOwner=async (req,res,next)=>{
  let {id}=req.params;
  let list= await listing.findById(id);
  if(! list.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","you are not the owner of this list");
    return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.isAuther=async (req,res,next)=>{
  let {id ,reviewId}=req.params;
  let reviews= await Review.findById(reviewId);
  if(! reviews.author.equals(res.locals.currUser._id)){
    req.flash("error","you are not the owner of this list");
    return res.redirect(`/listing/${id}`);
  }
  next();
}

module.exports.ValidationReviewPost=(req,res,next)=>{
  const { error }=reviewSchema.validate(req.body);
    if(error){
      throw new ExpressError(403,"Invalid entery");
    }
    else{
      next();
    }
  }