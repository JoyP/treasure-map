'use strict';

var Mongo = require('mongodb'),
    _     = require('lodash'),
    fs    = require('fs'),
    path  = require('path');

function Treasure(o){
  this.lat      = parseFloat(o.lat[0]);
  this.lng      = parseFloat(o.lng[0]);
  this.tname    = o.tname[0];
  this.lname    = o.lname[0];
  this.hint     = o.hint[0];
  this.diff     = o.diff[0];
  this.image    = '';
}

Object.defineProperty(Treasure, 'collection', {
  get: function(){return global.mongodb.collection('treasures');}
});

Treasure.create = function(fields, cb){
  var t = new Treasure(fields);
  Treasure.collection.save(t, cb);
  return(t);
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

Treasure.prototype.uploadPhoto = function(photo, cb){
  var dir   = __dirname + '/../static/img/' + this._id,
      ext   = path.extname(photo.photo[0].path),
      abs   = dir + '/' + this.tname + ext;
  fs.mkdirSync(dir);

  fs.renameSync(photo.photo[0].path, abs);
  this.image = abs;
  Treasure.collection.save(this, cb);
};

module.exports = Treasure;

