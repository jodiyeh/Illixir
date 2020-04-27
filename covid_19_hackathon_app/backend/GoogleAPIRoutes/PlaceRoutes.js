const axios = require('axios');
const express = require('express');
const router = express.Router();





function googlePlaceDetails(place_id) {
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBCqW6K3maZLWP-1SAoRzKy87ZFQKxIv1k',
    Promise: Promise
  });

  return googleMapsClient.place({ placeid: place_id }).asPromise();
}

async function getPlaceDetails(place_id) {
  console.log(place_id)
  try {
    const result = await googlePlaceDetails(place_id);
    return result;
  } catch (error) {
    console.log(error)
    return error;
  }
}


router.get('/', (req,res) => {
  var placeId = (req.query.placeId)
  console.log("Attempt to get places details");
  getPlaceDetails(placeId).then( re =>{
    console.log(re)
    res.json(re)
  })

})

module.exports = router;
