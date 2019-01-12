//Add dependencies
var path = require("path");

//Export the function
module.exports = function (app) {
    // Basic route that sends the user first to the AJAX Page
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    app.get("/add", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/add.html"));
    });

    app.get("/view", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/view.html"));
    });
}