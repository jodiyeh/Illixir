const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  var lat1 = parseFloat(req.query.lat) - parseFloat(req.query.distance);
  var lat2 = parseFloat(req.query.lat) + parseFloat(req.query.distance);
  var long1 = parseFloat(req.query.long) - parseFloat(req.query.distance);
  var long2 = parseFloat(req.query.long) + parseFloat(req.query.distance);
  console.log("Attempt to get urgent");
  axios.get('https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Urgent_Care_Facilities/FeatureServer/0/query?'+
  'where=X%20%3E%3D%20' + long1 + '%20'+
  'AND%20X%20%3C%3D%20' + long2 + '%20'+
  'AND%20Y%20%3E%3D%20' + lat1 + '%20'+
  'AND%20Y%20%3C%3D%20' + lat2 + '&outFields=*&outSR=4326&f=json')
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
