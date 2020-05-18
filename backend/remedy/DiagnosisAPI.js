const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  var symptoms = (req.query.symptoms);
  var gender = (req.query.gender);
  var year_of_birth = (req.query.year_of_birth);
  //language is always en-gb
  console.log(symptoms);
  console.log(year_of_birth);
  console.log(gender);
  console.log("GET: /api/diagnosis/ - Attempt to get diagnosis data.");
  axios.get('https://priaid-symptom-checker-v1.p.rapidapi.com/diagno?symptoms='+symptoms+'&gender='+gender+'&year_of_birth='+year_of_birth+'&language=en-gb',
  {
    headers:{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"priaid-symptom-checker-v1.p.rapidapi.com",
        "x-rapidapi-key":"47dd31d7afmsh2cb07155fce1f9ap10b028jsn99dddbd263b9",
        "useQueryString":true
        },
  })
    .then(response => {
      res.json(response.data.features)
    })
    .catch(error => {
      console.log("ERROR: " + error);
      res.json(error)
    });
})
module.exports = router;
