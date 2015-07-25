var myFirebaseRef = new Firebase("https://internetsimulator.firebaseio.com/");

function firebaseSendMessage(from, to, message){
  var usersRef = myFirebaseRef.child("users");
  var myUserRef = usersRef.child(from);
  var mySentRef = myUserRef.child("sent");
  var myReceivedRef = myUserRef.child("received");

  console.log("Sent a message from " + from + " to " + to + ": " + message);
  mySentRef.push({
    "from": from,
    "to": to,
    "message": message
  });

  var receivingUserRef = usersRef.child(to);
  var incomingRef = receivingUserRef.child("received");
  incomingRef.push({
    "from": from,
    "to": to,
    "message": message
  });
}

$(document).ready(function(){
  $("#login-button").click(function(){
    var username = $("#username").val();
    startFirebase(username);
  });
});


function startFirebase(username){
  var usersRef = myFirebaseRef.child("users");
  var myUserRef = usersRef.child(username);
  var mySentRef = myUserRef.child("sent");
  var myReceivedRef = myUserRef.child("received");

  myUserRef.child("info").set({
    name: username
  })

  function addUserToDisplay(username){
    console.log("new user " + username);

    // todo
  }

  myReceivedRef.on("child_added", function(snapshot, prevChildKey) {
    var message = snapshot.val();
    console.log("RECEIVED MESSAGE");
    addMessageToDisplay(message);
  });

  var usersList = [];

  // When a new user joins
  usersRef.on("child_added", function(snapshot, prevChildKey) {
      var user = snapshot.val();
      if(user.info){
        console.log(user.info.name);
        usersList.push(user.info.name);
        addUserToDisplay(user.info.name);
      }
  });
}


