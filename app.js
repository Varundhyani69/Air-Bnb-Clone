const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
}).catch((e)=>{
    console.log(e);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/",(req,res)=>{
    res.send("Hi I am root");
})

app.get("/testlisting", async (req,res)=>{
    let sampleListing = new Listing({
        title: "My new villa",
        description: "by the beach",
        price: 2525,
        location: "Jalandhar",
        country: "India"
    });
    await sampleListing.save();
    console.log("Response was saved");
    res.send("Successful");
});


app.listen(8080,()=>{
    console.log("Srver is listening to 8080");
})