'use strict';

exports.index = function(req, res){
  res.render('treasures/index');
};

exports.init = function(req, res){
  res.render('treasures/init');
};

exports.show = function(req, res){
  res.render('treasures/show');
};

