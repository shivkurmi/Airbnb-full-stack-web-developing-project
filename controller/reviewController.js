const listing=require("../models/listing.js");
const Review=require("../models/review.js");
module.exports.Review=async (req,res)=>{
  const list= await listing.findById(req.params.id);
  const newReview=new Review(req.body.review);
  list.reviews.push(newReview);
  await list.save();
  await newReview.save();
  res.redirect(`/listing/${list._id}`);
}

module.exports.destroyReview=async(req,res)=>{
  let {id,reviewId}=req.params;
  await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listing/${id}`);
};