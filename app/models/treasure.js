'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash');

function Treasure(o){
  this.name     = o.name;
  this.lat      = parseFloat(o.lat);
  this.lng      = parseFloat(o.lng);
  this.hint     = o.hint;
  this.diff     = o.diff;
  this.photo    = o.photo;
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.create = function(o,cb){
  var t = new Treasure(o);
  Treasure.collection.save(t,cb);
};

Treasure.all = function(cb){
  Treasure.collection.find().toArray(cb);
};

Treasure.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Treasure.collection.findOne({_id:_id}, function(err,obj){
    cb(err, _.create(Treasure.prototype, obj));
  });
};

module.exports = Treasure;

