const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Identity = require('../models/identity');

router.get('/',function(req,res,next){
    console.log('In getQueueRid!');
    Identity.getAllQueue(req.query.rid,function(err, queue){
        if(err){
            console.log('Error when trying to get queue!');
        }else if(queue == -1){
            console.log('rid doesnt exist!');
        }else{
            res.json(queue);
        }
    });
});

module.exports = router;
