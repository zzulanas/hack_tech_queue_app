var express = require('express');
var router = express.Router();
var config = require('../config/database');

const Identity = require('../models/identity');

router.get('/',function(req, res, next){
    Identity.getNextQP(req.query.rid,function(err,nextQP){
        if(err){
            console.log('Error when trying to get NextQP');
        }else{
            let newIdentity = new Identity({
                QRCode: req.query.QRString,
                username: req.query.username,
                rid: req.query.rid,
            });
            Identity.addIdentity(newIdentity,(err, identity)=>{
                if(err){
                    res.json({success: false, msg: 'Failed to insert identity'});
                }else{
                    res.json({success: true, msg: 'Successfully inserted into identity!'});
                }
            });
            console.log(newIdentity);
            console.log('New Identity Added!');
        }
    });
});

module.exports = router;
