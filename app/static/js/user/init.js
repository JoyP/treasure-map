/* global google:true */

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addTreasure);
  });

  function addTreasure(e){
    var lat = $('#lat').val();

    if(!lat){
      var name = $('#lname').val();
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      console.log('results:', results);
      var name  = results[0].formatted_address,
          lat   = results[0].geometry.location.lat(),
          lng   = results[0].geometry.location.lng();

      $('#lname').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();
    });
  }
})();
