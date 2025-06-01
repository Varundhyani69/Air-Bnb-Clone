const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validReview, isLoggedIn,isAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Review Post Route
router.post("/",isLoggedIn,validReview,wrapAsync(reviewController.createReview));

//Delete review
router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewController.deleteReview));


module.exports = router;