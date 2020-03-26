const router = require('express').Router();
let User = require('./user.model');

// TODO: implement create user route
router.route('/create').post((req,res) => {
});

// TODO: implement update user route
router.route('/update/:id').put((req,res) => {
});

// TODO: implement delete user route
router.route('/delete/:id').delete((req,res) => {
});

module.exports = router;
