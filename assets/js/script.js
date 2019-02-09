$(document).ready(function(){

    // Partner slider
        $('#partner-slider').owlCarousel({
            loop:true,
            margin:10,
            autoplay: true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:3
                },
                1000:{
                    items:4
                }
            }
        }); // end of #partner-slider


}); // end of $(document).ready(function()

/*----------------------------------------
            Classy Spacer ;)
-----------------------------------------*/

//OMDP API Ajax call
var movie = "Guardians of the Galaxy";
var queryURL = "https://www.omdbapi.com/?t="+ movie +"&plot=long&apikey=6316fd3";


$.ajax({
    url:queryURL,
    method:"GET"

}).then(function(response) {
    // console.log(response);

// Get Title, Actors, Poster, Plot and Genre
      var title= response.Title;
      console.log(title);

      var actors= response.Actors;
      console.log(actors);

      var poster= response.Poster;
      console.log(poster);

      var plot = response.Plot;
      console.log(plot);

      var genre = response.Genre;
      console.log(genre);
      


// insert plot into card


}); //End of OMDP API Ajax call

// Initialize tooltip component (radio buttons)
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  
  // Initialize popover component
  $(function () {
    $('[data-toggle="popover"]').popover();
    
  }); //End of radio buttons initialization
