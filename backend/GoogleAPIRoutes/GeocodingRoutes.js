const axios = require('axios');
const express = require('express');
const router = express.Router();



function googleGeoCode(address) {
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBCqW6K3maZLWP-1SAoRzKy87ZFQKxIv1k',
    Promise: Promise
  });

  return googleMapsClient.geocode({ address: address }).asPromise();
}

async function getGeoCode(address) {
  console.log(address)
  try {
    const result = await googleGeoCode(address);
    console.log(result.json.results[0].geometry.location)
    console.log(result.json.results[0].place_id)
    return {location: result.json.results[0].geometry.location, place_id: result.json.results[0].place_id};
  } catch (error) {
    console.log(error)
    return error;
  }
}

router.get('/', (req,res) => {
  var address = (req.query.address)
  console.log("Attempt to get geocode");
  getGeoCode(address).then( re =>{
    res.json(re)
  })

})

module.exports = router;
