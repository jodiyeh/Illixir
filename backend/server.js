const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
// bodyParser = require("body-parser");
const passport = require("passport");

const usersRouter = require('./user/user.routes');
const hospitalsRouter = require('./facilities/hospitals.routes');
const urgentCareRouter = require('./facilities/urgentCare.routes');
const emergencyOpsRouter = require('./facilities/emergencyOps.routes');
const fireStationsRouter = require('./facilities/fireStations.routes');
const nursingHomesRouter = require('./facilities/nursingHomes.routes');
const shelterRouter = require('./facilities/shelter.routes');
const veteranHealthRouter = require('./facilities/veteranHealth.routes');
const emergencyServicesRouter = require('./facilities/emergencyServices.routes');
const placeRouter = require('./GoogleAPIRoutes/PlaceRoutes');
const geocodingRouter = require('./GoogleAPIRoutes/GeocodingRoutes');

const path = require('path');

const port = process.env.PORT || 5000;
const app = express();
app.use(express.static(path.join(__dirname, "client/build")));

// Set up middleware: Cors
app.use('*', cors());

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());


// Set up MongoDB
//const uri = process.env.ATLAS_URI;
mongoose
  .connect('mongodb+srv://lz150:lz150@covid-19-app-backend-qt3mk.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB database connection established successfully!'))
  .catch((reason) => console.log(reason));

// Passport middleware
app.use(passport.initialize());

// Set up routes
app.use('/api/users', usersRouter);
app.use('/api/hospitals', hospitalsRouter);
app.use('/api/urgentCare', urgentCareRouter);
app.use('/api/emergencyOps', emergencyOpsRouter);
app.use('/api/fireStations', fireStationsRouter);
app.use('/api/nursingHomes', nursingHomesRouter);
app.use('/api/shelter', shelterRouter);
app.use('/api/veteranHealth', veteranHealthRouter);
app.use('/api/emergencyServices', emergencyServicesRouter);
app.use('/api/GoogleMapsApi/place', placeRouter);
app.use('/api/GoogleMapsApi/geocode', geocodingRouter);





// Run app
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
