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
    var movie=false;
    var type;
// Movie Radio
    if ($("#movieradio").is(":checked")){
    type="movie"
    movie=true;
    }
    else{
        type="person"
    }
    // console.log($("#movieradio").checked);



//OMDP API Ajax call for inital search. depending on the button chosen it will 
// insert type, either movie or person. Then query the string entered.
    var search = $("#user-input").val();
   
    var queryURL = "https://api.themoviedb.org/3/search/"+ type +"?api_key=f0af9ea07b16056057fccc931b462c5f&query="+ search + "&append_to_response=credits";
    

    $.ajax({
        url:queryURL,
        method:"GET"

    }).then(function(response) {
        var information= response.results;
        console.log(response);        
        
       
        // For loop through the results 
        for(var i=0;i < 12; i++){
        //   var carousel= ("<div>");
        //     carousel.attr("class", "item");
        //     carousel.attr("id", "carousel-"+ i);

        // $("#partner-slider").append(carousel);
           
            
             // IF STATEMENT distiguishing path to images,name etc
             if (type=== "person"){
                var actor= information[i].name;
                var idNumber= information[i].id;
                var actorPic=information[i].profile_path;
                var actorWorks= information[i].known_for;
                  //grabing info to pull from outer ajax   
                  for (var f= 0; f< actorWorks.length; f++){
                    var title = actorWorks[f].title;
                    var posterImg1="https://image.tmdb.org/t/p/w92" +actorWorks[f].poster_path;
                  }
                                 
                // console.log("THIS ONE",actorWorks[0].original_title);

                // insert photos into carousel
                var actorImg=$("<img>");
                  actorImg.attr("id","actor-"+ i);
                  actorImg.attr("data-id", idNumber);
                  actorImg.attr("data-known", title1 +" , " + title2 +" , "+ title3);
                  // actorImg.attr("data-posterURL", )
                  actorImg.attr("class", "images");
                  actorImg.attr("alt", "people-placeholder");
                  actorImg.attr("src", "https://image.tmdb.org/t/p/w185/" + actorPic);
                  $("#carousel-"+ i).empty().append(actorImg);

                  // Give label to images incuding Name and imdb Id numbers
                var actorName=$("<label>");
                  actorName.attr("for", "actor-"+i);
                  actorName.attr("data-id", idNumber);
                  $("#carousel-"+ i).prepend(actor);
                  $("#carousel-"+ i).append(idNumber);

               
                      
                  
             }
              // IF search is Movie 
             else {
                var title= information[i].title;
                var poster= information[i].poster_path;
                var movieSum=information[i].overview;
                var movieId=information[i].id;
                var dateReleased=information[i].release_date;
                var ratingVote= information[i].vote_average;

                console.log(information[i]);

                // insert image in carousel
                var posterImg= $("<img>");
                  posterImg.attr("id", "poster-"+ i);
                  posterImg.attr("class", "images");
                  posterImg.attr("data-sum", movieSum);
                  posterImg.attr("data-released", dateReleased);
                  posterImg.attr("data-rate", ratingVote);
                  posterImg.attr("data-mID",movieId);
                  posterImg.attr("name", title);
                  posterImg.attr("alt","movie");
                  posterImg.attr("src", "https://image.tmdb.org/t/p/w185/" + poster);
                $("#carousel-"+ i).empty().append(posterImg);
                //  give labels to poster title
                var posterName= $("<label>");
                  posterName.attr("for", "poster-"+i);
                  $("#carousel-"+ i).prepend(title);
              
                }
        }
    

        //On click of image Function that is copied and appended into information card 
        $(document.body).on("click", ".images", function(event){
          event.preventDefault();         
          var chosen= $(this);
          console.log(chosen);

          // Actor Ids from image
          var idNumber = chosen.attr('data-id');
          var knownFor = chosen.attr('data-known');


          //  Movie Ids from image
          var movieSum = chosen.attr('data-sum');
          var movieName=chosen.attr('name'); 
          var movieNumber=chosen.attr('data-mID');
          var relDate=chosen.attr('data-released');
          var rating=chosen.attr('data-rate');
          
          
          // Post image into new page under carousel
          $("#mainImage").empty().append(chosen.clone());
          

          // If statment to follow different paths to data depending on if person or movie 
          if(movie===false){ //actor or actress chosen
          
          $("#altBio").empty().append("Featured In");
          $("#altList").empty().append(knownFor);
                    
            // console.log(knownFor);       
            
            // Internal AJAX call that pulls more information using actors imdb or idNumber to gather more info
            $.ajax({
              url:"https://api.themoviedb.org/3/person/"+ idNumber +"?api_key=f0af9ea07b16056057fccc931b462c5f&language=en-US&adult=false",
              method:"GET"
      
            }).then(function(response2){
              console.log(response2);

              // Post data on the new page
              $("#summary").empty().append(response2.biography);
              $("#mainName").empty().append(response2.name);
              $("#mainBio").empty().append(response2.name);
              $("#subBio").empty().append("Known For: ", response2.known_for_department);
              $("#dates").empty().append("Birthday: ", response2.birthday);
              $("#rating").empty().append("Rating: "+ response2.popularity);
              // console.log(knownFor[0]);
              // $("#other").prepend(knownFor);


               });


          }else{ // movie chosen
            $("#summary").empty().append(movieSum);
            $("#mainName").empty().append(movieName);
            $("#mainBio").empty().append(movieName)
            $("#altBio").empty().append("Cast");
            $("#subBio").empty().append("Directed By: ")
            $("#dates").empty().append("Release Date:"+ relDate);
            $("#rating").empty().append("Rating " + rating);

            

            // internal movie AJAX call. This api uses the movie imdb id to pull credits and cast
            $.ajax({
              url:"https://api.themoviedb.org/3/movie/"+ movieNumber +"/credits?api_key=f0af9ea07b16056057fccc931b462c5f",
              method:"GET"

            }).then(function(response3){
              console.log(response3);
              var cast= response3.cast;
              var director= response3.crew[0].name;

              $("#subBio").empty().append("Directed By: " + director);
                      

              for(var l=0; l< response3.cast.length; l++){
                //  console.log(cast[l].character);
                 var castPic=cast[l].profile_path;
                 var castMem=cast[l].name;
                //  console.log(castPic);

                 var castImg=$("<img>");
                //  castImg.attr("src", 'http://image.tmdb.org/t/p/w185'+ cast[l].profile_path);
                 var castImgUrl= "https://image.tmdb.org/t/p/w92" + castPic;
                 console.log(castImgUrl);
                 castImg.attr("class", "images");
                 castImg.attr("id", "cast-"+ l);
                //  castImg.attr("alt src", )
                 castImg.attr("alt", "actor Image");
                 castImg.attr("data-name", castMem);
                 castImg.attr("src", castImgUrl);

                 console.log(castImg);

                 var castName= $("<label>");
                  castName.attr("for", "person-"+ l);
                  castName.attr("data-name", castMem);
                  // $("#carousel-"+ i).prepend(title);
                 


                   //  var imageCastURL= cast

                 $("#altBio").empty().append("Cast List");
                //  $("#altList").empty().append(castImg + castMem);
                  
                 $("#altList").append(castImg);
                 $("#altList").append(cast[l].name+ "<br>" +" As:" + cast[l].character+ "<br> ");;
               }
               })
          };


      
        });
        
    
      


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


/*==========================================
        LOGIN WINDOW (SIGN IN)
===========================================*/
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
   
    $('#close').click(function(){
      $('.containmain').slideUp(function(){
     
      
        $('#close').text("Sign In").addClass("not");
      
      
      });
                                  
                                 
      
      
    
    });
    
    
    $("#close").click(function(){
    
      if ($( "#close" ).hasClass( "not" )){
        $('.containmain').slideDown(function(){
    
      $('#close').text("Close").removeClass("not");
    });
   
    }
    }); //End of Login Window (sign in)
    
    
   /*==========================================
        LOGIN WINDOW (SIGN UP)
    ===========================================*/
    
    $(".topform2 , .bottomform2").focus(function() {
      $(this).css({'background-image': 'none'});
  });
    
    
    if ($('.topform2').is(':empty')){
    
    $(".topform2").focusout(function(){
     imageUrl = 'http://www.flaticon.com/png/256/16612.png';
      $(this).css('background-image', 'url(' + imageUrl + ')'); 
    });
      
    } else if ($('.topform2').not(':empty')){
    
       $(this).css('background-image', 'none'); 
      
    }
    
    
      $(".bottomform2").focusout(function(){
     imageUrl = 'http://www.flaticon.com/png/256/25239.png';
      $(this).css('background-image', 'url(' + imageUrl + ')'); 
    });
   
    $('#close2').click(function(){
      $('.containmain2').slideUp(function(){
     
      
        $('#close2').text("Sign Up").addClass("not");
      
      
      });
                                  
                                 
      
      
    
    });
    
    
    $("#close2").click(function(){
    
      if ($( "#close2" ).hasClass( "not" )){
        $('.containmain2').slideDown(function(){
   
      $('#close2').text("Close").removeClass("not");
    });
   
    }
    
    });

    
    
    
}); //End of Login Window (sign up)