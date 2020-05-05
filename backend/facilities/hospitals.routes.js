const axios = require('axios');
const express = require('express');
const router = express.Router();

// Routes to get the hospitals data
router.get('/', (req,res) => {
  var lat1 = parseFloat(req.query.lat) - parseFloat(req.query.distance);
  var lat2 = parseFloat(req.query.lat) + parseFloat(req.query.distance);
  var long1 = parseFloat(req.query.long) - parseFloat(req.query.distance);
  var long2 = parseFloat(req.query.long) + parseFloat(req.query.distance);
  console.log("GET: /api/hospitals/ - Attempt to get hospitals data.");
  axios.get('https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Hospitals_1/FeatureServer/0/query?where=LATITUDE%20%3E%3D%20'
  +lat1+'%20AND%20LATITUDE%20%3C%3D%20'
  +lat2+'%20AND%20LONGITUDE%20%3E%3D%20'
  +long1+'%20AND%20LONGITUDE%20%3C%3D%20'
  +long2+'&outFields=*&geometry=&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outSR=4326&f=json')
    .then(response => {
      res.json(response.data.features)
    })
    .catch(error => {
      console.log("ERROR: " + error);
      res.json(error)
    });
})

module.exports = router;
