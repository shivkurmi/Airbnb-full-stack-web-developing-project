const express=require("express");
const listing=require("../models/listing.js");
const warpError=require("../utils/wrapError.js");
const Review=require("../models/review.js")
const {ValidationReviewPost}=require("../AuthenticationMiddleware.js")
const ReviewController=require("../controller/reviewController.js");
const router=express.Router();
 // Review
  router.post("/:id",ValidationReviewPost,warpError(ReviewController.Review));
  
   // Delete review
  router.delete("/:id/delete/:reviewId",ReviewController.destroyReview);

module.exports=router;


