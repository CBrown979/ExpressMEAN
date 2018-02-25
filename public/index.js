/* global $ */

$(document).ready(function() {
    console.log('start');
    $(function(){
      $.get('/cities', appendToCities);
       
      function appendToCities(cities) {
          var myCities = [];
          var content, city;
        
          for(var i in cities) {
              console.log("check1");
              city = cities[i];
              content = '<a href="/cities/' + city + '">' + city +' </a>' + '<a href="#" data-block="'+ city+'"</a>';
              myCities.push($('<li>', {
                html: content
              }));
              
              // THE OLD Code When I had A DropDown List -- myCities.push($('<option>', { text: cities[i] }));
          }
          $('.cityList').append(myCities);
        }
        
        $('#addCity').on('submit', function(event){
          event.preventDefault();
          var form = $(this);
          var cityData = form.serialize();
          $.ajax({
            type: 'POST',
            url: '/cities',
            data: cityData
          }).done(function(cityName){
            appendToCities([cityName]);
            form.trigger('reset');
          });
        });
        
        $('.cityList').on('click', 'a[data-block]', function(event){
          if(!confirm('All set?')){
            return false;
          }
          var target = $(event.currentTarget);
          $.ajax({
            type: 'DELETE',
            url: '/cities/' + target.data('city')
          }).done(function(){
            target.parents('li').remove();
          });
        });
        
      });
    console.log("end");

});