const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use('*', cors());
app.use(express.json());

require('dotenv').config();
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
).catch(function (reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./Users/user.routes'); // import exercise route
app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
