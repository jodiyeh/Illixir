const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const passport = require("passport");
const usersRouter = require('./user/user.routes');
const hospitalsRouter = require('./facilities/hospitals.routes');
const urgentCareRouter = require('./facilities/urgentCare.routes');
const emergencyOpsRouter = require('./facilities/emergencyOps.routes');
const nursingHomesRouter = require('./facilities/nursingHomes.routes');
const veteranHealthRouter = require('./facilities/veteranHealth.routes');
const emergencyServicesRouter = require('./facilities/emergencyServices.routes');
const placeRouter = require('./GoogleAPIRoutes/PlaceRoutes');
const geocodingRouter = require('./GoogleAPIRoutes/GeocodingRoutes');
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
  .then(() => console.log('MongoDB database connection established successfully.'))
  .catch((reason) => console.log(reason));

// Passport middleware
app.use(passport.initialize());

// Set up routes

// User routes
app.use('/api/users', usersRouter);

// Database routes
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/urgentCare', urgentCareRouter);
app.use('/api/emergencyOps', emergencyOpsRouter);
app.use('/api/nursingHomes', nursingHomesRouter);
app.use('/api/veteranHealth', veteranHealthRouter);
app.use('/api/emergencyServices', emergencyServicesRouter);

// Google API services routes
app.use('/api/GoogleMapsApi/place', placeRouter);
app.use('/api/GoogleMapsApi/geocode', geocodingRouter);

// Run app
app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
