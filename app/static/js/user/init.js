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
      console.log('name:', name);
      geocode(name);
      e.preventDefault();
    }
  }

  function geocode(address){
    console.log('address:', address);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({address:address}, function(results, status){
      var name  = results[0].formatted_address,
          lat   = results[0].geometry.location.lat(),
          lng   = results[0].geometry.location.lng();
      debugger;
      console.log('this is lat:', lat);
      console.lng('this is lng:', lng);

      $('#lname').val(name);
      $('#lat').val(lat);
      $('#lng').val(lng);

      $('form').submit();
    });
  }
})();
