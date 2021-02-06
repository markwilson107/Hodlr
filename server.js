require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require('helmet');
const hpp = require('hpp');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

const routes = require("./routes");

// DB Config
const db = require("./config/keys").mongoURI;

/* Set Security Configs */
// app.use(helmet());
// app.use(hpp());

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
app.use(express.static("client/public"));

// Passport config
const passportControl = require('./config/passport');

// Passport middleware
app.use(passportControl.initialize());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true})
.then(() => console.log("MongoDB successfully connected"))
.catch(err => console.log(err));

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server listening on PORT ${PORT}!`);
});
