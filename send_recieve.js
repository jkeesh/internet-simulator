var users = [
	"Calvin", "Jeremy", "Zach"
];

var inboxTable = "#inboxTable";
var lastInboxRow = "#inboxTable tr:last";
var sendButton = "#sendButton";
var toUserSelect = "#toUserSelect";


function sendMessage(from, to, message){
	console.log("From: " + from + "\nTo: " + to + "\nMessage: " + message);
};

/*
* Collect 'from', 'to', and 'message' data from page and send the 'message'
* to the 'to' user from the 'from' user
*/
function send(){
	var from = $("#username").val();
	var to = $("#toUserSelect").val();
	var message = $("#message").val();
	sendMessage(from, to, message);
};

/*
* Add an incoming message to the inbox table
*
* @param incomingMessageObject - object with three fields:
*		from - string indicating from user
*		to - string indicating to user
*		message - string that contains the incoming message
*/
function addMessageToDisplay(incomingMessageObject){
	var from = incomingMessageObject.from;
	var message = incomingMessageObject.message;
	var decoded = Translator.translate(message);
	var newRow = "<tr><td>" + from + "</td><td>" + message + "</td></tr>";
	$(lastInboxRow).after(newRow);
}

function createUserSelectRow(user){
	return "<option value='" + user + "'>" + user + "</option>";
}

$(document).ready(function(){
	$(sendButton).click(send);
	for(var index in users){
		$(toUserSelect).append(createUserSelectRow(users[index]));
	}
});