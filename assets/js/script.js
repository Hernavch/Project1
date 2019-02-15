$(document).ready(function () {
    // Partner slider
    $('#partner-slider').owlCarousel({
        loop: true,
        startPosition: 0,
        margin: 10,
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

// Code that manages user access to realtime database, where they can store their favorites.
// Some of this code is WET, but it works.

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBS3FwfutxUzA7if9tp2dTIz4tnheaPHlw",
    authDomain: "wita-5c12e.firebaseapp.com",
    databaseURL: "https://wita-5c12e.firebaseio.com",
    projectId: "wita-5c12e",
    storageBucket: "wita-5c12e.appspot.com",
    messagingSenderId: "451967820384"
};
firebase.initializeApp(config);

var database = firebase.database();

var loggedIn = false;

// The user before they are logged in
var user = {
    key: "",
    name: "",
    favorites: []
}

function clearForm() {
    $("#username").val("");
    $("#password").val("");
}

function loadFavorites(key) {
    database.ref('users/' + key).once("value", function(snapshot) {
        user.favorites = snapshot.favorites;
    })
};

// Sign Up database access
$("#submitUp").on("click", function() {
    event.preventDefault();        
    // For serious: both of them
    if ($("#usernameUp").val() != "" && $("#passwordUp").val () != "") {
        var users = database.ref('users'); // pull the directory where the users will be
        var search = users.orderByChild('username').equalTo($("#usernameUp").val()); // search keys for matching username
        search.once("value", function(snapshot) {
            if ($("#passwordUp").val() === $("#passConfirm").val()) {
                if (!snapshot.exists()) {
                    database.ref("users").push({
                        username: $("#usernameUp").val(),
                        password: $("#passwordUp").val(),
                        favorites: []
                    }).then(function(snap) {
                        // local variables are stored for browser to reference user
                        user.key = snap.key;
                        user.name = $("#usernameUp").val();
                        loggedIn = true;
                    })
                    loadFavorites(user.key);
                    // $("#signForm").remove();
                }
                else {
                    clearForm();
                    $(".center2 p").text("That name has already been used. Please enter a different name.");
                }
            }
            else {
                $(".center2 p").text("Password confirmation did not match. Please re-enter.");
            }
        })
    }
    else {
        clearForm();
        $(".center2 p").text("Please enter both username and password.");
        // $("#signForm").prepend("<p>Enter username and password,</p>");
    }
})

// Sign In database access
$("#submitIn").on("click", function() {
    event.preventDefault();
    // For serious: both of them
    if ($("#usernameIn").val() != "" && $("#passwordIn").val () != "") {
        var users = database.ref('users'); // pull the directory where the users will be
        var search = users.orderByChild('username').equalTo($("#usernameIn").val()); // search keys for matching username
        search.once("value", function(snapshot) {
            if (snapshot.exists()) {
                database.ref().child('users').orderByChild('username').equalTo($("#usernameIn").val()).once("value", function(snap) {
                    // temporarily accept the information
                    snap.forEach(function (data) {
                        user.key = data.key;
                        user.name = $("#usernameIn").val();
                    });
                    console.log(user);
                    // look for password
                    database.ref('users/' + user.key).once("value", function(snapshot) {
                        // Is it right?
                        if (snapshot.val().password === $("#passwordIn").val()) {
                            console.log("log in success");
                            loadFavorites(user.key);
                            loggedIn = true;
                            // $("#signForm").remove();
                        }
                        else {
                            console.log("log in failure")
                            clearForm();
                            $(".center p").text("Username or password is incorrect. Please try again.");
                        }
                    });
                });
            }
            else {
                clearForm();
                $(".center p").text("Username or password is incorrect. Please try again.");
            };
        });
    }
    else {
        clearForm();
        $(".center p").text("Please enter both username and password.");
    };
});


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

    //TMDB API Ajax call
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
                // var actorWorks = information[i].known_for;
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
            // remove utelly
            $("#streaming").remove();
            $("#streamResults").remove();
            $("#utelly").remove();
            // set up necessary variables
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
                    console.log(loggedIn);
                    if (loggedIn === true) {
                        $("#addFav").html("<button id='favButton'>Add to favorites</button>");
                        $("#addFav").on("click", function() {
                            console.log($("#mainName").text());
                            console.log(user.favorites);
                            user.favorites.push($("#mainName").text());
                            database.ref('users/' + user.key).update(snapshot);
                            snapshot.favorites = user.favorites
                        })
                        console.log(user.favorites);
                    }
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
                // remove utelly
                $("#streaming").remove();
                $("#streamResults").remove();
                $("#utelly").remove();
                // add Utelly
                // console.log("Addign the utelly button");
                if (!$("#streaming").length) {
                    $(".box-post").append("<button id=streaming>Find On Streaming Serice</button>");
                }

                $("#streaming").on("click", function() {
                    $("#streaming").remove();
                    $(".box-post").append("<div id=utelly></div>");
                    $("#utelly").append("<h3>Available to stream on:</h3>");
                    $("#utelly").css({"display": "flex", "flex-direction": "column", "flex-wrap": "wrap"});
                    $("#utelly").append("<div id=streamResults></div>");
                    $("#streamResults").css({"width": "100%","display": "flex", "flex-wrap": "wrap"});
                    // ajax query for utelly
                    $.ajax({
                        url: "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movieName + "&country=us",
                        type: "GET",
                        // requires API key in a header
                        beforeSend: function(xhr){xhr.setRequestHeader("X-RapidAPI-Key", "75fb5da7dcmsh2589fdfd6e6eeacp1afe21jsn79fc57f99255");},
                    }).then(function (result) {
                        // console.log(queryURL);
                        // console.log(result);
                        // console.log(result.results[0].locations);
                        var locations = result.results[0].locations;
                        
                        for (var i = 0; i < locations.length; i++) {
                            var service = locations[i].display_name;
                            service = service.replace(/\s/g, "");
                            $("#streamResults").append("<img src=assets/images/" + service + ".png />");
                            // console.log(locations[i].display_name);
                            // console.log(service);
                        }
                        if (!locations.length) {
                            $("#streamResults").append("Unavailable on Amazon, Netlix, and iTunes.");
                        }
                    });
                });
                $("#bioSyn").text("Synopsis");
                $("#movAct").text("Cast");
                $("#dates").empty().append(release);
                $("#mainName").empty().append(movieName);
                $("#summary").empty().append(movieSum);
                $.ajax({
                    url: "https://api.themoviedb.org/3/movie/" + idNumber + "/credits?api_key=f0af9ea07b16056057fccc931b462c5f&language=en-US&adult=false",
                    method: "GET"
                }).then(function (response) {
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
                        searchTMDB($(this).text());
                    });
                });
            };
        });
    }); //End of TMDB API Ajax call
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



