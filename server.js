//Add dependencies
var express = require("express");

//Set up the express app
var app = express();
var PORT = process.env.PORT || 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Server Routes
var apiRoutes=require("./app/routing/apiRoutes");
apiRoutes(app);
var htmlRoutes=require("./app/routing/htmlRoutes");
htmlRoutes(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});