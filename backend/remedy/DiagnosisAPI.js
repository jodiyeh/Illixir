const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  console.log("GET: /api/diagnosis/ - Attempt to get diagnosis data.");

  var symptom = (req.query.symptoms);
  var gender = (req.query.gender);
  var year_of_birth = (req.query.year_of_birth);
  console.log(year_of_birth);
  console.log(gender);
  var url = 'https://priaid-symptom-checker-v1.p.rapidapi.com/diagnosis?symptoms=%5B'+symptom+'%5D&gender='+gender+'&year_of_birth='+year_of_birth+'&language=en-gb'
  console.log(url);

  axios.get(url,
  {
    headers:{
        "content-type":"application/octet-stream",
        "x-rapidapi-host":"priaid-symptom-checker-v1.p.rapidapi.com",
        "x-rapidapi-key":"47dd31d7afmsh2cb07155fce1f9ap10b028jsn99dddbd263b9",
        "useQueryString":true
        },
  })
    .then(response => {
      res.json(response.data)
    })
    .catch(error => {
      console.log("ERROR: " + error);
      res.json(error)
    });
})
module.exports = router;
