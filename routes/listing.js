const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//index route
router.get("/",wrapAsync(listingController.index));
//new route
router.get("/new",isLoggedIn,listingController.renderNew)
//show route
router.get("/:id",wrapAsync(listingController.showListing))
//create route
router.post("/", upload.single("listing[image]"),validListing,wrapAsync(listingController.createListing))
//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing))
//update route
router.put("/:id",isLoggedIn,isOwner,upload.single("listing[image]"),validListing,wrapAsync(listingController.updateListing))
//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deleteListing))

module.exports = router;