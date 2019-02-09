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

// Generate the form for sign in
function signForm(){
    $("#login").remove();
    var signUp = $("<div id=signForm>");
    // This line is the whole form
    signUp.append(" \
        <form> \
            Username:<br /> \
            <input type='text' name='username' id='username' value='' />\
            <br />Password:<br /> \
            <input type='password' name='password' id='password' value='' /> \
            <br /><br /> \
            <input type='submit' value='Submit' id='submit'/> \
        </form>"
    )
    $("body").append(signUp);
};

function clearForm() {
    $("#username").val("");
    $("#password").val("");
}

function loadFavorites(key) {
    database.ref('users/' + key).once("value", function(snapshot) {
        user.favorites = snapshot.favorites;
    })
};

// When sign up is clicked, generate a sign up form
$("#signUp").on("click", function () {
    event.preventDefault();
    signForm();
    $("#signForm").append(" \
        <p>Please do not use a username or password from any other site.</p> \
        <p>Data stored on this site is not secure.</p>"
    );
    // When a username and password have both been submitted
    $("#submit").on("click", function() {
        event.preventDefault();        
        // For serious: both of them
        if ($("#username").val() != "" && $("#password").val () != "") {
            var users = database.ref('users'); // pull the directory where the users will be
            var search = users.orderByChild('username').equalTo($("#username").val()); // search keys for matching username
            search.once("value", function(snapshot) {
                if (!snapshot.exists()) {
                    database.ref("users").push({
                        username: $("#username").val(),
                        password: $("#password").val(),
                        favorites: []
                    }).then(function(snap) {
                        // local variables are stored for browser to reference user
                        user.key = snap.key;
                        user.name = $("#username").val();
                    })
                    loadFavorites(user.key);
                    $("#signForm").remove();
                }
                else {
                    clearForm();
                    $("#signForm").prepend("<p>That name has already been used.</p>");
                }
            })
        }
        else {
            clearForm();
            $("#signForm").prepend("<p>Enter username and password,</p>");
        }
    })
})

$("#signIn").on("click", function() {
    event.preventDefault();
    signForm();
    $("#signForm").append("<p>Please eneter your name and password.</p>");
    // When a username and password have both been submitted
    $("#submit").on("click", function() {
        event.preventDefault();
        // For serious: both of them
        if ($("#username").val() != "" && $("#password").val () != "") {
            var users = database.ref('users'); // pull the directory where the users will be
            var search = users.orderByChild('username').equalTo($("#username").val()); // search keys for matching username
            search.once("value", function(snapshot) {
                if (snapshot.exists()) {
                    database.ref().child('users').orderByChild('username').equalTo($("#username").val()).once("value", function(snap) {
                        // temporarily accept the information
                        snap.forEach(function (data) {
                            user.key = data.key;
                            user.name = $("#username").val();
                        });
                        console.log(user);
                        // look for password
                        database.ref('users/' + user.key).once("value", function(snapshot) {
                            // Is it right?
                            if (snapshot.val().password === $("#password").val()) {
                                loadFavorites(user.key);
                                $("#signForm").remove();
                            }
                            else {
                                clearForm();
                               $("#signForm").prepend("<p>Username or password is incorrect.</p>");
                            }
                        });
                    });
                }
                else {
                    clearForm();
                    $("#signForm").prepend("<p>Username or password is incorrect.</p>");
                };
            });
        }
        else {
            clearForm();
            $("#signForm").prepend("<p>Enter username and password.</p>");
        };
    });
});