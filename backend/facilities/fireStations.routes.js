const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  console.log("Attempt to get hospitals");
  axios.get('https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Fire_Station/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
    .then(response => {
      console.log("RESPONSE: ");
      res.json(response.data.features)
    })
    .catch(error => {
      console.log("ERROR: " + error);
      res.json(error)
    });
})

module.exports = router;
