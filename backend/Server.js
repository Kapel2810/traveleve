const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./database.config')
const mongoose =  require('mongoose')
const cors = require('cors')



mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// create express app
const app = express();
 
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse requests of content-type - application/json
app.use(bodyParser.json())
app.use(cors())
 
// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to traveleve application. Take notes quickly. Organize and keep track of all your notes." });
})

require('./routes/vacations.route')(app);
require('./routes/users.route')(app);
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
