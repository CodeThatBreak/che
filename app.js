var express = require("express");
var app= express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var Campground = require("./models/campground");
var methodOverride = require("method-override")
var seedDB = require("./seed");
var Comment = require("./models/comment");
var flash = require("connect-flash");

////  routes !!!!!!////=================
var commentRoutes = require("./routes/comment");
var campgroundRoutes = require("./routes/campground");
var indexRoutes = require("./routes/index");
// ====================================//
//======= Login concept==========//
var passport = require("passport");
var LocalStrategy  = require("passport-local")
var User = require("./models/user")
//====================================//
app.use(require("express-session")({
    secret:"Rusty is the best and cutest dog!",
    resave:false,
    saveUninitialized :false
}));
app.use(methodOverride("_method"))
app.use(flash());
// seedDB();

// mongoose.connect('mongodb://localhost:27017/yelp_camp',{ useNewUrlParser: true });

// mongoose.connect("mongodb+srv://amarsingh200021:amarsingh200021@devment-4htbk.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true});


mongoose.connect("mongodb+srv://amarsingh200021:amarsingh200021@devment-4htbk.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

//============= login ===========//
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//==========================//

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.get("/",function(req,res){
    res.render("campgrounds/home");
})

app.use("/",indexRoutes);
app.use("/campground",campgroundRoutes);
app.use("/campground/:id/comments",commentRoutes);


app.listen(process.env.PORT);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);