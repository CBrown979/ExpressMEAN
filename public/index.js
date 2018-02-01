/* global $ */
$(document).ready(function() {

$(function(){
   $.get('/cities', appendToCities);
   
   function appendToCities(cities) {
       var myCities = [];
       for( var i in cities) {
           myCities.push($('<option>', { text: cities[i] }));
       }
       $('.cityList').append(myCities);
    }
  });
});