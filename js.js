var config = {
    apiKey: "AIzaSyDbFYKY4s0ShBZHC_rQ0pcvCbxqYvqwj4A",
    authDomain: "confident-mix-137523.firebaseapp.com",
    databaseURL: "https://confident-mix-137523.firebaseio.com",
    storageBucket: "confident-mix-137523.appspot.com",
};

var myFirebase = new Firebase("https://confident-mix-137523.firebaseio.com");

/*// Start the server
var server = app.listen(process.env.PORT || '8080', function () {
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit.');
});*/

var usernameInput = document.querySelector('#username');
var textInput = document.querySelector('#text');
var postButton = document.querySelector('#post');
textInput.value = "";
postButton.addEventListener("click", function () {
    var msgUser = usernameInput.value;
    var msgText = textInput.value;
    var postMsg = msgUser + " says: " + msgText;
    console.log(postMsg);


    myFirebase.push({
        username: msgUser,
        text: msgText
    }, function (error) {
        if (error !== null) {
            alert("Unable to push comments");
        }
    });

});

myFirebase.on('child_added', function (snapshot) {
    var userName = snapshot.val().username;
    var comment = snapshot.val().text;
    var commentsContainer = $('#results');
    console.log(userName);
    console.log(comment);



    $('<div/>', {
            class: 'comment-container'
        })
        .html('<span class="label label-default">' + userName + '</span>' + comment).appendTo(commentsContainer);

    commentsContainer.scrollTop(commentsContainer.prop('scrollHeight'));
});

/*var startListening = function () {
    myFirebase.on('child_added', function (snapshot) {
        var msg = snapshot.val();

        var msgUsernameElement = document.createElement("b");
        msgUsernameElement.textContent = msg.username;

        var msgTextElement = document.createElement("p");
        msgTextElement.textContent = msg.text;

        var msgElement = document.createElement("div");
        msgElement.appendChild(msgUsernameElement);
        msgElement.appendChild(msgTextElement);

        document.getElementById("results").appendChild(msgElement);
    });
}

// Begin listening for data
startListening();*/
