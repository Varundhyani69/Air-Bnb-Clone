const User = require("../models/user.js");

module.exports.signup = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.renderSignup = async(req,res)=>{
    try{
        let {username , email , password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listings");

        });
        
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = (req,res)=>{res.render("users/login.ejs")};

module.exports.checkLogin = async (req,res)=>{
        req.flash("success","Welcome back to Wanderlust! You are logged in");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        console.log(req.user);
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
};