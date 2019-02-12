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
        
       
<<<<<<< HEAD
        // For loop through the results 
        for(var i=0;i < 12; i++){
            // $("carousel-"+ i).empty();
             // IF STATEMENT distiguishing path to images,name etc
             if (type=== "person"){

                var actor= information[i].name;
                console.log(actor);
                var actorPic=information[i].profile_path;
                var actorWorks= information[i].known_for;
                // insert photos into carousel
                var actorImg=$("<img>");
                  actorImg.attr("id","actor-"+ i);
                  actorImg.attr("alt", "actor");
                  actorImg.attr("src", "http://image.tmdb.org/t/p/w185/" + actorPic);
                  $("#carousel-"+ i).empty().append(actorImg);

                var actorName=$("<label>");
                  actorName.attr("for", "actor-"+i);
                  $("#carousel-"+ i).prepend(actor);

                      // //For loop to show actorswork  
                      for(var j=0; j < actorWorks.length; j++){
                        var actorMovie= actorWorks[j];
                        }
                  

                      
             }
              // IF search is Movie 
             else {
               
                var title= information[i].title;
                var poster= information[i].poster_path;
                var movieSum=information[i].overview;

                console.log(poster);
                // insert image in carousel
                var posterImg= $("<img>");
                  posterImg.attr("id", "poster-"+ i);
                  posterImg.attr("alt","movie");
                  posterImg.attr("src", "http://image.tmdb.org/t/p/w185/" + information[i].poster_path);
                $("#carousel-"+ i).empty().append(posterImg);

                var posterName= $("<label>");
                  posterName.attr("for", "poster-"+i);
                  $("#carousel-"+ i).prepend(title);
                                             
                // for loop to change id number for image
              
                
=======
// For loop through the results 
        for(var i=0;i < 12; i++){

             if (type=== "person"){
// IF STATEMENT distiguishing path to images etc
                var actorName= information[i].name;
                var actorPic=information[i].profile_path;
                var filmography= information[i].known_for;
                      //For loop through known for   
             }
             else {
                var title= information[i].title;
                var poster= information[i].poster_path;
                var movieSum=information[i].overview;
>>>>>>> 7941b12599cc2fd3e17e3c8e658d22a99c2ccf96
            }
        }
        
    
      


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