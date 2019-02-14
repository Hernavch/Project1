$(document).ready(function () {
    // Partner slider
    $('#partner-slider').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 4
            }
        }
    }); // end of #partner-slider
}); // end of $(document).ready(function()

/*----------------------------------------
            Classy Spacer ;)
-----------------------------------------*/

//Search Function On click function
$("#searchbtn").on("click", function () {
    event.preventDefault();
    searchTMDB($("#user-input").val());
});

var type;
var movie = false;

function searchTMDB(input) {  
    // Movie Radio
    if ($("#movieradio").is(":checked")) {
        type = "movie"
        movie = true;
    }
    else {
        type = "person"
    }

    //OMDP API Ajax call
    var search = input;
    var queryURL = "https://api.themoviedb.org/3/search/" + type + "?api_key=f0af9ea07b16056057fccc931b462c5f&query=" + search + "&append_to_response=credits";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var information = response.results;
        // For loop through the results
        var k = 10;
        if (information.length < 10) {k = information.length};
        for (var i = 0; i < k; i++) {
            // $("carousel-"+ i).empty();
            // IF STATEMENT distiguishing path to images,name etc
            if (type === "person") {
                var actor = information[i].name;
                var idNumber = information[i].id;
                var actorPic = information[i].profile_path;
                var actorWorks = information[i].known_for;
                // insert photos into carousel
                var actorImg = $("<img>");
                actorImg.attr("id", "actor-" + i);
                actorImg.attr("data-id", idNumber);
                actorImg.attr("class", "images");
                actorImg.attr("alt", "actor");
                actorImg.attr("src", "http://image.tmdb.org/t/p/w185/" + actorPic);
                $("#carousel-" + i).empty().append(actorImg);
                var actorName = $("<label>");
                actorName.attr("for", "actor-" + i);
                actorName.attr("data-id", idNumber);
                $("#carousel-" + i).prepend(actor);
                $("#carousel-" + i).append(idNumber);

                // //For loop to show actorswork
                // for (var j = 0; j < actorWorks.length; j++) {
                //     var actorMovie = actorWorks[j];
                // }
            }
            // IF search is Movie
            else {
                var title = information[i].title;
                var idNumber = information[i].id;
                var poster = information[i].poster_path;
                var movieSum = information[i].overview;
                // insert image in carousel
                var posterImg = $("<img>");
                posterImg.attr("id", "poster-" + i);
                posterImg.attr("data-id", idNumber);
                posterImg.attr("class", "images");
                posterImg.attr("data-sum", movieSum);
                posterImg.attr("name", title);
                posterImg.attr("alt", "movie");
                posterImg.attr("src", "http://image.tmdb.org/t/p/w185/" + poster);
                posterImg.attr("date", information[i].release_date)
                $("#carousel-" + i).empty().append(posterImg);
                var posterName = $("<label>");
                posterName.attr("for", "poster-" + i);
                $("#carousel-" + i).prepend(title);
            }
        }
        $(document.body).on("click", ".images", function () {
            var chosen = $(this);
            var idNumber = chosen.attr('data-id');
            var movieSum = chosen.attr('data-sum');
            var movieName = chosen.attr('name');
            var release = chosen.attr('date');
            $("#mainImage").empty().append(chosen.clone());
            if (movie === false) {
                $("#bioSyn").text("Biography");
                $("#movAct").text("Movies");
                $.ajax({
                    url: "https://api.themoviedb.org/3/person/" + idNumber + "?api_key=f0af9ea07b16056057fccc931b462c5f&language=en-US&adult=false",
                    method: "GET"
                }).then(function (response2) {
                    $("#summary").empty().append(response2.biography);
                    $("#mainName").empty().append(response2.name);
                    $("#dates").empty().append(response2.birthday);
                    // Call to tmdb to see what movies the actor has been in
                    $.ajax({
                        url: "https://api.themoviedb.org/3/person/" + idNumber + "/movie_credits?api_key=f0af9ea07b16056057fccc931b462c5f&language=en-US&adult=false",
                        method: "GET"
                    }).then(function (response) {
                        $("#movieList").html("");
                        for (var j =0; j < response.cast.length; j++) {
                            var film = $("<p>")
                            film.append("<span class='movieTitle'>" + response.cast[j].title + "</span>");
                            film.append("<span>: " + response.cast[j].character + ", </span>");
                            $("#movieList").append(film);
                        }
                        $(".movieTitle").on("click", function () {
                            event.preventDefault()
                            $(".movieTitle").off("click");
                            type = "movie";
                            movie = true;
                            $("#actorradio").prop("checked", false);
                            $("#movieradio").prop("checked", true);
                            searchTMDB($(this).text());
                        });
                    });
                });
            }
            else {
                $("#bioSyn").text("Synopsis");
                $("#movAct").text("Cast");
                $("#dates").empty().append(release);
                $("#mainName").empty().append(movieName);
                $("#summary").empty().append(movieSum);
                $.ajax({
                    url: "https://api.themoviedb.org/3/movie/" + idNumber + "/credits?api_key=f0af9ea07b16056057fccc931b462c5f&language=en-US&adult=false",
                    method: "GET"
                }).then(function (response) {
                    console.log(response);
                    $("#movieList").html("");
                    for (var j =0; j < response.cast.length; j++) {
                        var film = $("<p>")
                        film.append("<span>" + response.cast[j].character + ": </span>");
                        film.append("<span class='movieTitle'>" + response.cast[j].name + ", </span>");
                        $("#movieList").append(film);
                    }
                    $(".movieTitle").on("click", function () {
                        event.preventDefault()
                        $(".movieTitle").off("click");
                        type = "person";
                        movie = false;
                        $("#actorradio").prop("checked", true);
                        $("#movieradio").prop("checked", false);
                        console.log($(this).text());
                        console.log(type + movie);
                        searchTMDB($(this).text());
                    });
                });
            };
        });
    }); //End of OMDP API Ajax call
}; // End of on click event

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
$(window).ready(function () {
    $(".topform , .bottomform").focus(function () {
        $(this).css({ 'background-image': 'none' });
    });
    if ($('.topform').is(':empty')) {
        $(".topform").focusout(function () {
            imageUrl = 'http://www.flaticon.com/png/256/16612.png';
            $(this).css('background-image', 'url(' + imageUrl + ')');
        });
    }
    else if ($('.topform').not(':empty')) {
        $(this).css('background-image', 'none');
    }
    $(".bottomform").focusout(function () {
        imageUrl = 'http://www.flaticon.com/png/256/25239.png';
        $(this).css('background-image', 'url(' + imageUrl + ')');
    });

    $('#close').click(function () {
        $('.containmain').slideUp(function () {
            $('#close').text("Sign In").addClass("not");
        });
    });

    $("#close").click(function () {
        if ($("#close").hasClass("not")) {
            $('.containmain').slideDown(function () {
                $('#close').text("Close").removeClass("not");
            });
        }
    }); //End of Login Window (sign in)

    /*==========================================
                LOGIN WINDOW (SIGN UP)
    ===========================================*/

    $(".topform2 , .bottomform2").focus(function () {
        $(this).css({ 'background-image': 'none' });
    });
    if ($('.topform2').is(':empty')) {
        $(".topform2").focusout(function () {
            imageUrl = 'http://www.flaticon.com/png/256/16612.png';
            $(this).css('background-image', 'url(' + imageUrl + ')');
        });
    }
    else if ($('.topform2').not(':empty')) {
        $(this).css('background-image', 'none');
    }

    $(".bottomform2").focusout(function () {
        imageUrl = 'http://www.flaticon.com/png/256/25239.png';
        $(this).css('background-image', 'url(' + imageUrl + ')');
    });

    $('#close2').click(function () {
        $('.containmain2').slideUp(function () {
            $('#close2').text("Sign Up").addClass("not");
        });
    });

    $("#close2").click(function () {
        if ($("#close2").hasClass("not")) {
            $('.containmain2').slideDown(function () {
                $('#close2').text("Close").removeClass("not");
            });
        }
    }); //End of Login Window (sign up)
}); // End of window ready for logins