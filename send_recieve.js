users = [
	{"name" : "Calvin"}, 
	{"name" : "Jeremy"}, 
	{"name" : "Zach"}
];

function sendMessage(from, to, message){
	console.log("From: " + from + "\nTo: " + to + "\nMessage: " + message);
};

function send(){
	from = $("#username").val();
	to = $("#toUserSelect").val();
	message = $("#message").val();
	sendMessage(from, to, message);
};

function addMessageToDisplay(incomingMessageObject){
	from = incomingMessageObject.from;
	message = incomingMessageObject.message;
	
}

$(document).ready(function(){
	("#sendButton").click(send);
});