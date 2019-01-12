//Import data js files
var tables = require("../data/tables");
var waitlist = require("../data/waitlist");

//Export the function
module.exports = function (app) {
    // Displays all tables
    app.get("/api/tables", function (req, res) {
        return res.json(tables);
    });

    // Displays all waitlist
    app.get("/api/waitlist", function (req, res) {
        return res.json(waitlist);
    });

    // Displays a single table, or returns false
    app.get("/api/tables/:name", function (req, res) {
        var chosen = req.params.name;

        console.log(chosen);

        for (var i = 0; i < tables.length; i++) {
            if (chosen === tables[i].routeName) {
                return res.json(tables[i]);
            }
        }

        return res.json(false);
    });

    // Create New Table - takes in JSON input
    app.post("/api/tables", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newTable = req.body;

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

        console.log(newTable);

        if (tables.length < 5) {
            tables.push(newTable);
            newTable.onWaitList = false;
        } else {
            waitlist.push(newTable);
            newTable.onWaitList = true;
        }

        res.json(newTable);
    });

    //Delete table api route
    app.delete("/api/tables/:routeName", function(req, res){
        var chosen = req.params.routeName;

        console.log(chosen);

        for (var i = 0; i < tables.length; i++) {
            if (chosen === tables[i].routeName) {
                tables.splice(i, 1);

                // If there are any people in the waitlist 
                //then add them to the reservation list to fill up the 5 spots
                if (waitlist.length > 0 && tables.length < 5) {

                    const reservationPositionsAvailable = (5 - tables.length);
                    const numWaitListsToMove = (waitlist.length >= reservationPositionsAvailable) ? reservationPositionsAvailable : waitlist.length

                    const waitListItemsToMove = waitlist.splice(0, numWaitListsToMove);
                    tables = tables.concat(waitListItemsToMove);
                }

                return res.json(true);
            }
        }

        return res.json(false);
    });

    //Delete waitlist api route
    app.delete("/api/waitlist/:routeName", function(req, res){
        var chosen = req.params.routeName;

        console.log(chosen);

        for (var i = 0; i < waitlist.length; i++) {
            if (chosen === waitlist[i].routeName) {
                waitlist.splice(i, 1);
                return res.json(true);
            }
        }

        return res.json(false);
    });
};