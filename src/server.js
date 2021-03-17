const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require ("mysql2");
const connection = sql.createConnection ( {
    host: "mysql.stackcp.com",
    user: "senior-project-3137330131",
    password: "chess123",
    database: "senior-project-3137330131",
    port: 52454
});

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require ("./app/models");
db.sequelize.sync ();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

app.post ("/account", (req, res) => {
    res.json({ firstName: req.body.firstName, lastName: req.body.lastName, emailAddress: req.body.emailAddress });
    var values = [];
    values.push (req.body.firstName);
    values.push (req.body.lastName);
    values.push (req.body.emailAddress);

    connection.connect (function (err) {
        if (err) 
            throw err;
        else {
            console.log ("Connected to MySQL");
            app.listen (3000);
            console.log ("Listening to port 3000");
            connection.query ("INSERT INTO accounts (firstName, lastName, emailAddress) VALUES ('" + values.join ("', '") + "')", function(err) {
                if (err) console.log ("Error", err.message);
                else console.log ("\nSuccess!\n");
            });
        }
    });
    
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});