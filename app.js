const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");

const MONGO_URL = 'mongodb://127.0.0.1:27017/bnb';
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main().then(()=>{
    console.log("connected to db");
}).catch(err =>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("root");
});
//index route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})
//New route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})
//show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
})
//Create Route
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    console.log(listing);
})
//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
})
//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    res.redirect("/listings");
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description : "By the beach",
//         price: 1200,
//         location: "punjab",
//         country: "India"
//     })
//     await sampleListing.save();
//     console.log("Sample was saved");
//     res.send("successful testing");
// })

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
})
