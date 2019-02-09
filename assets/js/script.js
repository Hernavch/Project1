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
        // console.log(response.results[0].title);
        var information= response.results;
        
       
// For loop through the results 
        for(var i=0;i < 12; i++){

             if (type=== "person"){
// IF STATEMENT distiguishing path to images etc
                console.log(information[i].name);       
             }
             else {
                console.log(information[i].title);
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