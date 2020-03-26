const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
// bodyParser = require("body-parser");
const passport = require("passport");

const usersRouter = require('./Users/user.routes');
const port = process.env.PORT || 5000;
const app = express();

// Set up middleware: Cors
app.use('*', cors());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

// Config
require('dotenv').config();

// Set up MongoDB
const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB database connection established successfully!'));
  .catch((reason) => console.log('Unable to connect to the mongodb instance. Error: ', reason));

// Set up routes
app.use('/api/users', usersRouter);

// Run app
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
