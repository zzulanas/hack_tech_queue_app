const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Identity = require('../models/identity');

router.get('/',function(req, res, next){
    console.log('Need to delete a user from DB!');
    Identity.updateQueue(req.query.username, function(err, data){
        console.log('After Deleting user.');
        console.log(data);
    });
});

module.exports = router;
