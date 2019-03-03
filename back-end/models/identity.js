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
    timestamp:{
        type: Date,
        default: Date.now
    }
});

const Identity = module.exports = mongoose.model('Identity', IdentitySchema);

module.exports.addIdentity = function(newIdentity, callback){
    console.log('In addIdentity');
    newIdentity.save(callback);
}

module.exports.getNextQP = function(checkRid, callback){
    console.log('In getNextQP');
    Identity.count({rid: parseInt(checkRid)},function(err,data){
        console.log(data);
        if(err){
            return callback(err);
        }else{
            return callback(null,data);
        }
    });
}

module.exports.getAllQueue = function(checkRid, callback){
    console.log('In getAllQueue()');
    Identity.find({rid: checkRid}, function(err,data){
        if(err){
            return callback(err);
        }else if(data){
            return callback(null,data);
        }else{
            return callback(null, -1);
        }
    });
}

module.exports.updateQueue = function(deleteUsername, callback){
    console.log('Deleting a user and updating QP.');
    Identity.findOne({username: deleteUsername}, function(err,data){
        Identity.deleteOne({username: deleteUsername}, function(err,dData){
            if(err){
                return callback(err);
            }else{
                return callback(null, dData);
            }
        });
    });
}
