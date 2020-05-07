const axios = require('axios');
const express = require('express');
const router = express.Router();
const keys = require("../config/keys");

// Function for initializing the geocoder
function googleGeoCode(address) {
  const googleMapsClient = require('@google/maps').createClient({
    key: keys.GoogleAPIKey,
    Promise: Promise
  });
  return googleMapsClient.geocode({ address: address }).asPromise();
}

// Async function for using geocoder and then waiting for results
async function getGeoCode(address) {
  console.log("Geocoding: " + address)
  try {
    const result = await googleGeoCode(address);
    console.log("Returning location: " + JSON.stringify(result.json.results[0].geometry.location))
    console.log("Returning place id: " + JSON.stringify(result.json.results[0].place_id))
    return {location: result.json.results[0].geometry.location, place_id: result.json.results[0].place_id};
  } catch (error) {
    console.log("Error " + error)
    return error;
  }
}

// Route to use geocoding service
router.get('/', (req,res) => {
  var address = (req.query.address)
  console.log("GET: /api/GoogleMapsApi/geocode/ - Attempt to use geocoding service.");
  getGeoCode(address).then( response =>{
    res.json(response)
  })
})

module.exports = router;
