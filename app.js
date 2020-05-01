//setup
const express = require("express");
var app = express();
var request = require("request");
app.listen(3000, function(){
	console.log("server started")
})

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//routes
app.get("/", function(req, res){
	var mykey = "ENxE6Hpohl07gAB7DEeGeoAB5cqTIyCZsZzDnz2k"
	var apod_url = "https://api.nasa.gov/planetary/apod?api_key="+mykey;
	request(apod_url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body)
			res.render("search", {data:data});
		}
	})
	
});
app.get("/results", function(req, res){
	var msearch = req.query.search;
	
	var s_url = "https://images-api.nasa.gov/search?q=" + msearch +"&media_type=image"
	request(s_url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			res.render("results", {data:data});
			// res.send(data);
			// console.log(data["collection"]);
		}
	});
	// res.send("hello");
});