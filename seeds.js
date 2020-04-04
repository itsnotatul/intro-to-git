var mongoose = require("mongoose");
	
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

var Campground = require("./models/campground"),
	Comment    = require("./models/comment");


var data =[
	{
		name:"Granite Hill",
		image:"https://images.unsplash.com/photo-1533873984035-25970ab07461?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
	},
	{
		name:"Schit's Creek",
		image:"https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries."
	},
	{
        name:"Lebowski's Ground",
		image:"https://images.unsplash.com/photo-1500332988905-1bf2a5733f63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "		
	}
];




function seedDB(){
	//Remove all campgrounds
	Campground.remove({},function(err){
	// 	if(err){
	// 		console.log(err);
	// 	}
	// 	console.log("removed campgrounds!");
	        
	// 	   // add new campgrounds
	// 		for(var i=0;i<data.length;i++){
	// 			Campground.create(data[i],function(err,campground){
	// 				if(err){
	// 					console.log(err);
	// 				}else{
	// 					console.log("added a new campground");
	// 					Comment.create(
	// 					{
	// 						text:"This is a great place , wish it had internet",
	// 						author:"Homer"
	// 					},function(err,comment){
	// 						campground.comments.push(comment);
	// 						campground.save();
	// 						console.log("created new comment");
	// 					}
	// 					             );
	// 				     }
	// 			});
	// }
	 } );}




module.exports= seedDB;




