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

//Search Function On click function
$("#searchbtn").on("click", function(){ 
    event.preventDefault();
    
    var type;
// Movie Radio
    if ($("#movieradio").is(":checked")){
    type="movie"
    }
    else{
        type="person"
    }
    // console.log($("#movieradio").checked);



//OMDP API Ajax call
    var search = $("#user-input").val();

    var queryURL = "https://api.themoviedb.org/3/search/"+ type +"?api_key=f0af9ea07b16056057fccc931b462c5f&query="+ search;
    

    $.ajax({
        url:queryURL,
        method:"GET"

    }).then(function(response) {
        // console.log(response.results);
        var information= response.results;
        
       
        // For loop through the results 
        for(var i=0;i < information.length; i++){
            // $("carousel-"+ i).empty();
             // IF STATEMENT distiguishing path to images,name etc
             if (type=== "person"){

                var actorName= information[i].name;
                console.log(actorName);
                var actorPic=information[i].profile_path;
                var actorWorks= information[i].known_for;
                      // //For loop to show actorswork  
                      for(var j=0; j < actorWorks.length; j++){
                        var actorMovie= actorWorks[j];
                        // console.log(actorMovie.title);
                        // console.log(actorMovie.poster_path);
                        // console.log(actorMovie.overview);
                      }


                      
             }
              // IF search is Movie 
             else {
               
                var title= information[i].title;
                var poster= information[i].poster_path;
                var movieSum=information[i].overview;

                console.log(poster);

                var posterImg= $("<img>");
                posterImg.attr("id", "poster-"+ i);
                posterImg.attr("src", "http://image.tmdb.org/t/p/w185/" + information[i].poster_path);

                console.log(posterImg);
                
                $("#carousel-"+ i).empty().append(posterImg);
               
                              
                // for loop to change id number for image
              
                
            }
        }
        
    
      
// insert plot into card

}); //End of OMDP API Ajax call

//  AJAX Movie Query S


});

// Initialize tooltip component (radio buttons)
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });
  
  // Initialize popover component
  $(function () {
    $('[data-toggle="popover"]').popover();
    
  }); //End of radio buttons initialization


  /*=======================================================
    ##CLASSY AND NOT AT ALL OVER THE TOP LOGIN
  =======================================================*/

  $(window).load(function(){

    $('.containmain').slideDown(700);
  
  });
  
  $(window).ready(function(){
    $(".topform , .bottomform").focus(function() {
      $(this).css({'background-image': 'none'});
  });
    
    
    if ($('.topform').is(':empty')){
    
    $(".topform").focusout(function(){
     imageUrl = 'http://www.flaticon.com/png/256/16612.png';
      $(this).css('background-image', 'url(' + imageUrl + ')'); 
    });
      
    } else if ($('.topform').not(':empty')){
    
       $(this).css('background-image', 'none'); 
      
    }
    
    
      $(".bottomform").focusout(function(){
     imageUrl = 'http://www.flaticon.com/png/256/25239.png';
      $(this).css('background-image', 'url(' + imageUrl + ')'); 
    });
   
    $('.close').click(function(){
      $('.containmain').slideUp(function(){
     
      
        $('.close').text("Open").addClass("not");
      
      
      });
                                  
                                 
      
      
    
    });
    
    
    $("#close").click(function(){
    
      if ($( "#close" ).hasClass( "not" )){
        $('.containmain').slideDown(function(){
    
      $('.close').text("Close").removeClass("not");
    });
   
    }
    
    });
    }); //END OF CLASSY AND NOT AT ALL OVER THE TOP LOGIN.