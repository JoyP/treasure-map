'use strict';

var Treasure  = require('../models/treasure'),
    mp        = require('multiparty');

exports.index = function(req, res){
  Treasure.all(function(err, treasures){
    res.render('treasures/index', {treasures:treasures});
  });
};

exports.init = function(req,res){
  res.render('treasures/init');
};

exports.create = function(req, res){
  var form = new mp.Form();
  console.log('req in controller.create:', req);
  form.parse(req, function(err, fields, file){
    console.log('fields in controller:', fields);
    Treasure.create(fields, function(err, newTreasure){
      newTreasure.uploadPhoto(file, function(){
        res.redirect('/treasures');
      });
    });
  });
};

exports.show = function(req, res){
  Treasure.findById(req.params.id, function(err, treasure){
    res.render('treasures/show', {treasure:treasure});
  });
};

