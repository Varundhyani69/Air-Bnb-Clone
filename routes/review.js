const express = require("express");
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {validReview, isLoggedIn,isAuthor} = require("../middleware.js");


//Review Post Route
router.post("/",isLoggedIn,validReview,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    // res.send("New Review Saved");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}))

//Delete review
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(async(req,res)=>{
    let {id,reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id,{$pull: {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}))


module.exports = router;