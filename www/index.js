var config;
var locationDB;
var managerKey;

$(document).ready(function() {

    $(document).delegate("joinMatch", "pageinit", function(event, data) {

        $(".iscroll-wrapper", this).bind({

            iscroll_onpulldown: function() {

                setTimeout(function() {

                    $("#matches").empty();

                    locationDB.ref().once("value").then(function(snapshot) {

                        snapshot.forEach(function(childSnapshot) {

                            managerKey = childSnapshot.child("matchName").val();

                            //console.log(key);

                            //adds the username to the list
                            $("#matches").append("<li><a href='#' onclick='#'>" + managerKey + "</a></li>");

                        });

                        //refreshes the list
                        $("#matches").listview("refresh");

                    });

                    //refreshes again: this is so the list will display
                    $("#matches").listview("refresh");

                }, 250); //has a short delay so users can register animation

            }

        });

    });

});

window.onload = function() {

    document.addEventListener("deviceready", init, false);

};

function init() {

    document.addEventListener("backbutton", function(e) {

        if ($.mobile.activePage.is('#login')) {

            e.preventDefault();
            navigator.app.exitApp();

        } else {

            navigator.app.backHistory();

        }

    }, false);

    config = {
        apiKey: "AIzaSyBUpJxSaO20GEARRNyieWMtbhwGh0CxI7w",
        authDomain: "buzzr-6e0fc.firebaseapp.com",
        databaseURL: "https://buzzr-6e0fc.firebaseio.com",
        storageBucket: "buzzr-6e0fc.appspot.com",
    };

    firebase.initializeApp(config);

    locationDB = firebase.database();
    
}

function goTo(name) {

    window.location.href = "#" + name;

}

function createMatch() {

    var gameMode = $("#gameMode").val();
    var matchName = $("#matchName").val();

    managerKey = locationDB.ref().push({
        gameMode: gameMode,
        matchName: matchName,
    }).key;

    goTo("managerPage");
}