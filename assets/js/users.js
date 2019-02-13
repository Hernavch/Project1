// Some of this code is WET, but it works, and we can move it around to where we want it and style it and DRY it out later.

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

// The user before they are logged in
var user = {
    key: "",
    name: "",
    favorites: []
}

// create sign in/up buttons
var login = $("<div id='login'>");
login.append("<button type='button' id='signIn'>Sign In</button>");
login.append("<button type='button' id='signUp'>Sign Up</button>");
$("body").append(login);

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