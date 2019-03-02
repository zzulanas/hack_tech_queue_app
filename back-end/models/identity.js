const mongoose = require('mongoose');
const config = require('../config/database');

// Identity Schema
const IdentitySchema = mongoose.Schema({
    QRCode:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    rid:{
        type: Number,
        required: true
    },
    QP:{
        type: Number,
        required: true
    }
});

const Identity = module.exports = mongoose.model('Identity', IdentitySchema);

module.exports.addIdentity = function(newIdentity, callback){
    newIdentity.save(callback);
}

module.exports.getNextQP = function(checkRid, callback){
    console.log('In getNextQP');
    var query = {rid: checkRid};
    let temp = Identity.find(query).sort({QP:-1}).limit(1);
    console.log(temp);
}
