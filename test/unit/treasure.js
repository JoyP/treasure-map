/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Treasure    = require('../../app/models/treasure'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'treasure-test',
    Mongo     = require('mongodb');

describe('Treasure', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Treasure object', function(){
      var t = new Treasure({tname:'gold', loc:{lname:'Dublin, Ireland',lat:'53.321',lng:'-6.267'}, hint:'fly to Ireland, use GPS', diff:'easy', photo: 'img/gold.jpg'});
      expect(t).to.be.instanceof(Treasure);
      expect(t.tname).to.equal('gold');
      expect(t.loc.lname).to.equal('Dublin, Ireland');
      expect(t.loc.lat).to.equal(53.321);
      expect(t.loc.lng).to.equal(-6.267);
      expect(t.hint).to.equal('fly to Ireland, use GPS');
      expect(t.diff).to.equal('easy');
      expect(t.photo).to.equal('img/gold.jpg');
    });
  });

  describe('.create', function(){
    it('should save an object to the database', function(done){
      var obj = ({tname:'gold', loc:{lname:'Dublin, Ireland',lat:'53.321', lng:'-6.267'}, hint:'fly to Ireland, use GPS', diff:'easy', photo: 'img/gold.jpg'});
      Treasure.create(obj, function(err, t){
        console.log(t);
        expect(t._id).to.be.instanceof(Mongo.ObjectID);
        expect(t).to.be.instanceof(Treasure);
        expect(t.tname).to.equal('gold');
        expect(t.photo).to.equal('img/gold.jpg');
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all people', function(done){
      Treasure.all(function(err, treasures){
        expect(treasures).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a treasure by its ID', function(done){
      Treasure.findById('000000000000000000000002',function(err, t){
        expect(t).to.be.instanceof(Treasure);
        expect(t.tname).to.equal('diamonds');
        expect(t.loc.lat).to.equal(66.761);
        expect(t.loc.lng).to.equal(124.123);
        expect(t.hint).to.equal('fly to Russia, find largest diamond mine');
        expect(t.diff).to.equal('medium');
        expect(t.photo).to.equal('img/diamonds.jpg');
        done();
      });
    });
  });
});

