// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information for the notes stored in the database.
// ===============================================================================

var notesData = require("../database/db");


var fs = require("fs");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {
        res.json(notesData);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    // Create New Notes - takes in JSON input
    app.post("/api/notes", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user
        // This works because of our body parsing middleware
        var newNote = req.body;



        console.log(newNote);

        var title = newNote.title
        var text = newNote.text
        // .toString()- turns the intergar into a strong so it matches the setup in our db.json file & can be read
        var idGen =(Math.floor(Math.random() * 1000) + 1).toString()
        var idNote = { title, text, id: idGen }


        notesData.push(idNote);

        fs.writeFile("database/db.json", JSON.stringify(notesData, null, 2), err => {
            if (err) throw err;

            console.log("Hahaha We Have The Data!")
        })


        //res.json(idNote);
        res.json(notesData);
    });
    
    /* Attempt to delete note */
    app.delete("/api/notes/:id", function (req, res) {
        

        console.log(notesData)

        //.filter used in replace of a for loop to target the Note by the ID and delete it
            notesData=notesData.filter(function(note){
                return note.id !== req.params.id;

                
            });
            console.log(notesData)
            console.log(req.params.id)
            res.json(notesData);
            console.log("Yes, i deleted you!")
        });





    

};
