//all the middleswares goes here
var Campground = require("../models/campground");
var Comment = require("../models/comments");

var middleswareObj = {};

middleswareObj.checkCampgroundOwnership = function(req,res,next){
    //is user logged in 
if(req.isAuthenticated()){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            req.flash("error","Campground not found");
            res.redirect("back");
        }else{
                   //does user owns the campground?
            if(foundCampground.author.id.equals(req.user._id)){
               next();
            }else{
                req.flash("error","You don't have permission to do that");
                res.redirect("back"); //oterwise redirect 
            } 
        }
    });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");    //if not redirect
    }
};

middleswareObj.checkCommentOwnership = function(req,res,next){
    //is user logged in 
if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
                   //does user owns the comment?
            if(foundComment.author.id.equals(req.user._id)){
               next();
            }else{
                req.flash("error","You don't have permission to do that");
                res.redirect("back"); //oterwise redirect 
            } 
        }
    });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");    //if not redirect
    }
};

middleswareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}


module.exports = middleswareObj;