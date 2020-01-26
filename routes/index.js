var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//===== register form=========//

router.get("/register",function(req,res){
    res.render("register");
})
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            req.flash("error",err.message)
            res.render("register")
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to YelpCamp"+ user.username)
                res.redirect("/campground");
            })
        }
    })
})
//=========== login form =====//
router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/campground",
        failureRedirect:"/login"
    }), function(req,res){
});

//====== logout=====//
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","logged you out")
    res.redirect("/campground");
})

// ===== middleware====//

module.exports = router;