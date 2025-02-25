/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

PORT = 9330;

// Database
var db = require('./database/db-connector')

//HandleBars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars'); // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"})); // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs'); // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
// app.js

app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM bsg_people;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM bsg_people WHERE lname LIKE "${req.query.lname}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM bsg_planets;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            return res.render('index', {data: people, planets: planets});
        })
    })
});
                                                    



app.post('/add-person-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let homeworld = parseInt(data['input-homeworld']);
    if (isNaN(homeworld))
    {
        homeworld = 'NULL'
    }

    let age = parseInt(data['input-age']);
    if (isNaN(age))
    {
        age = 'NULL'
    }

    // Create the query and run it on the database
    query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }

        // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
        // presents it on the screen
        else
        {
            res.redirect('/');
        }
    })
})

app.delete('/delete-person-ajax/', function(req,res,next){
    let data = req.body;
    let personID = parseInt(data.id);
    let deleteBsg_Cert_People = `DELETE FROM bsg_cert_people WHERE pid = ?`;
    let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteBsg_Cert_People, [personID], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  // Run the second query
                  db.pool.query(deleteBsg_People, [personID], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.sendStatus(204);
                      }
                  })
              }
  })});

  app.put('/put-person-ajax', function(req,res,next){
    let data = req.body;
  
    let homeworld = parseInt(data.homeworld);
    let person = parseInt(data.fullname);
  
    let queryUpdateWorld = `UPDATE bsg_people SET homeworld = ? WHERE bsg_people.id = ?`;
    let selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`
  
          // Run the 1st query
          db.pool.query(queryUpdateWorld, [homeworld, person], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the people's
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectWorld, [homeworld], function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});