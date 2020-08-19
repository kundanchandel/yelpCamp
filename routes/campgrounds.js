var express = require("express");
var router  = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment  = require("../models/comments");
var middleware = require("../middleware");

//index route - show all camps
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
    })   
});
//create route - add new campgrounds to db
router.post("/",middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
        id : req.user._id,
        username:req.user.username
    }
    var newCampground = {name:name,image:image,description:desc,author:author}
    Campground.create(newCampground,function(err,newCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    }); 
});
// new route - show form to create new route
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});
// show route - shows more info about one campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campgrounds:foundCampground});
        }
    });
});

//edit campground route
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        Campground.findById(req.params.id,function(err,foundCampground){
                    res.render("campgrounds/edit",{campground:foundCampground});
        });
});
//update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updateCampgroud){
        if(err){
            res.redirect("/campgrounds");
        }else{
                //redirect to somewhere (show page)
            res.redirect("/campgrounds/"+req.params.id);
        }
    })

});

//Destroy campground word
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
      if(err){
          res.redirect("/campgrounds");
      }
      res.redirect("/campgrounds");
    })
});

//middle ware


module.exports = router;