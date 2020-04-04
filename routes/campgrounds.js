var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var mongoose   = require("mongoose");
var middleware = require("../middleware");


//INDEX ROUTE - show all campgrounds
router.get("/campgrounds",function(req,res){
	
			//get all campgrounds from db
		  Campground.find({},function(err,allcampgrounds){
			   if(err){
				  console.log(err);
				 }else{
					 res.render("campgrounds/index",{
						
						 campgrounds:allcampgrounds ,
					    								
													});
					 }
		     });
     });


//NEW Route - show form to create a new campground
router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
})

// CREATE Route - add new campground to db
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	
			//get data from form and add it to db
			var name = req.body.name;
	        var price = req.body.price;
			var image = req.body.image;
			var desc = req.body.description;
	        var author={
				 id:req.user._id,
				username:req.user.username
			}

	
    var newCampground = {name: name, image: image, description: desc, price: price, author:author};
	
     
			Campground.create(newCampground,function(err,newlyCreated){
				if(err){
					console.log(err);
				}else{
					//redirect back to campgrounds page
					res.redirect("/campgrounds");
				}
			});
	
  }); 


//SHOW route - shows info about chosen campground
router.get("/campgrounds/:id",function(req,res){
	//find the campground with the provided id
	
	 var id = mongoose.Types.ObjectId(req.params.id); 
	
	
	Campground.findById(id).populate("comments").exec(function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error","Campground not found");
			res.redirect("back");
		}else{
			//render show template with campground
	      res.render("campgrounds/show",{campground :foundCampground});
		}
	});
});

//EDIT Route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	var id = mongoose.Types.ObjectId(req.params.id);
	Campground.findById(id,function(err,foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground} );
		
	});
	
});
//UPDATE Route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	var id = mongoose.Types.ObjectId(req.params.id);

		
Campground.findByIdAndUpdate(id,req.body.campground,function(err,updatedCamground){
		if(err){
			//changes here too in if and else statement
			req.flash("error", err.message);
            res.redirect("back");
		}else{
			req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + id);
		}
	});
});	

	
//DESTROY Campground Route
	
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
	 Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports= router;




