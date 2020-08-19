var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comments");

var data = [
{
        name:"Allianz Arena",
        image:"https://cache.desktopnexus.com/thumbseg/75/75947-bigthumbnail.jpg"
    },
    {
        name:"Juventus Stadium",
        image:"https://static1.squarespace.com/static/57547aeb55598617f52e6861/t/57547e7309a58efaf8005d3f/1368718315072/1000w/philly+union+stadium+may+2013.jpg",
        description:"Opened only four years ago, Juventus' new stadium may be small compared to others we have already seen (41, 000) but what it lacks in size it makes up for in appearance.You should hope so too after it cost €120 million to build." 
    },
    {
        name:"Santiago Bernabéu",
        image:"https://tse3.mm.bing.net/th?id=OIP.nWOXaFxjvBYhoWaYkbK6SgAAAA&pid=Api&P=0&w=254&h=178",
        description:"Goals are guaranteed when you go to the Bernabéu and just as Barcelona have Messi as their star attraction, the opportunity to see CR7 in the flesh is reason enough to give it a visit." 
    }
]
function seedDB(){
    //remove all campgrounds
    Campground.remove({},function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("Removed Campground");
        //    // add few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed,function(err,campground){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("Added a campground");
        //                 //add comments
        //             Comment.create(
        //                 {
        //                     text:"great place, but i wish there was interet",
        //                     author:"KSC"
        //                 },function(err,comment){
        //                     if(err){
        //                         console.log(err);
        //                     }else{
        //                         campground.comments.push(comment);
        //                         campground.save();
        //                         console.log("comments added");
        //                     }
        //                 });
        //         }
        //     });
        // });
    });


}
module.exports = seedDB;