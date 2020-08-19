var express     = require("express"); 
var app         = express();
var bodyparser  = require("body-parser");
var mongoose    = require("mongoose");
var flash       = require("connect-flash");
var passport    = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground  = require("./models/campground");
var Comment     = require("./models/comments");
var User        = require("./models/user");
var seedDB      = require("./seeds");
// requiring routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var authRoutes  = require("./routes/index");
const dotenv = require('dotenv')
dotenv.config();
//seedDB();
mongoose.connect(process.env.DB_HOST,function(err){
if(err) throw err;
console.log("connected to db...");
});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport congiguration
app.use(require("express-session")({
    secret:"anything",
    resave:false,
    saveUninitialized:false
})); 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

app.use("/",authRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000,function(){
    console.log("serving...");
});

      
