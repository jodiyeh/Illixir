const axios = require('axios');
const express = require('express');
const router = express.Router();

// Function for initializing the place details service
function googlePlaceDetails(place_id) {
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBCqW6K3maZLWP-1SAoRzKy87ZFQKxIv1k',
    Promise: Promise
  });
  return googleMapsClient.place({ placeid: place_id }).asPromise();
}

// Async function to utilize the place details service and then waiting for results
async function getPlaceDetails(place_id) {
  console.log("Getting details for: " + place_id)
  try {
    const result = await googlePlaceDetails(place_id);
    return result;
  } catch (error) {
    console.log("Error " + error)
    return error;
  }
}

// Route to use place details service
router.get('/', (req,res) => {
  var placeId = (req.query.placeId)
  console.log("GET: /api/GoogleMapsApi/palce/ - Attempt to use place details service.");
  getPlaceDetails(placeId).then( response =>{
    res.json(response)
  })
})

module.exports = router;
