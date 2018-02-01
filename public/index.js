/* global $ */

$(document).ready(function() {
    console.log('start');
    $(function(){
      $.get('/cities', appendToCities);
       
      function appendToCities(cities) {
          var myCities = [];
          for(var i in cities) {
              console.log("hi");
              myCities.push($('<option>', { text: cities[i] }));
          }
          $('#cityList').append(myCities);
        }
      });
    console.log("end");

});