/*global google:true*/

(function(){
  'use strict';

  $(document).ready(function(){
    $('form').submit(addTreasure);
  });

  function addTreasure(e){
    console.log(e);
    e.preventDefault();
  }

})();
