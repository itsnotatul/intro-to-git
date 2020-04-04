var express = require("express");
var router  = express.Router();
var mongoose = require("mongoose");

var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS ROUTES

router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
	//find campground by id
	var id =  mongoose.Types.ObjectId(req.params.id);
	Campground.findById(id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new",{campground:campground});
		}
	}) 
	
})

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
	// find campground by id
	var id =  mongoose.Types.ObjectId(req.params.id);
	Campground.findById(id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went wrong")
					console.log(err);
				}else{
//we'll get here inly if its logged in so, req.user contain our user					
					//add username n id to comment
					comment["author"]["id"]=req.user._id;
					comment["author"]["username"]=req.user.username;
					//save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success","Successfully added comment");
					res.redirect("/campgrounds/"+id);
				}
			});
			
		}
	})
});

//edit route
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	
	var campground_id =  mongoose.Types.ObjectId(req.params.id);
	var id =  mongoose.Types.ObjectId(req.params.comment_id);
	
// someone can change the camp id in the url and broke our app so 
	Campground.findById(campground_id,function(err,foundCampground){
		if(err || !foundCampground){
			req.flash("error","Campground not found");
			return res.redirect("back");
		}
		//error handling is done now
		
		Comment.findById(id,function(err,foundComment){
		if(err){
			res.redirect("back");
		}else{
	res.render("comments/edit",{campground_id:campground_id,comment:foundComment});
		}
	})
});
	});
	
	
//Comment UPDATE Route
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	var id =  mongoose.Types.ObjectId(req.params.comment_id);
	var id2 =  mongoose.Types.ObjectId(req.params.id);
	Comment.findByIdAndUpdate(id,req.body.comment,function(err,updatedComment){	
	if(err){
		res.redirect("back");
	}else{
		res.redirect("/campgrounds/"+id2);
	}
	     })
	
});
//DELETE COMMENT Route
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	var id =  mongoose.Types.ObjectId(req.params.comment_id);
	var id2 =  mongoose.Types.ObjectId(req.params.id);
	
	 Comment.findByIdAndRemove(id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" + id2);
       }
    });
});

module.exports= router;

