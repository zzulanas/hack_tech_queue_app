var express = require('express');
var router = express.Router();
var config = require('../config/database');

const Identity = require('../models/identity');

router.get('/',function(req, res, next){
    Identity.getNextQP(req.query.rid,()=>{});
    let newIdentity = new Identity({
        QRCode: req.query.QRString,
        username: req.query.username,
        rid: req.query.rid,
        QP: req.query.QP
    });
    Identity.addIdentity(newIdentity,(err, identity)=>{
        if(err){
            res.json({success: false, msg: 'Failed to insert identity'});
        }else{
            res.json({success: true, msh: 'Successfully inserted into identity!'});
        }
    });
    console.log(newIdentity);
    console.log('New Identity Added!');
});

module.exports = router;
