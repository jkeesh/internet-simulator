//List of users currently online
var users = [];

/*
* Constants for JQuery handles
*/
var INBOX_TABLE = "#inboxTable";
var LAST_INBOX_ROW = "#inboxTable tr:last";
var SEND_BUTTON = "#sendButton";
var TO_USER_SELECT = "#toUserSelect";
var MESSAGE = "#message";
var USERNAME = "#username";

/*
* Given a username creates an option for that user that can be
* placed in an html select element.
*
* @param: user - string indicating the user name
*/
function createUserRow(user){
	return "<option value='" + user + "'>" + user + "</option>";
}

/*
* Given a from user, a message, and a decoded message, create an html table row
* with that information
*
* @param from - string indicating from user
* @param message - string indicating original message
* @param decodedMessage - string indicating decoded message
*/
function createInboxTableRow(from, message, decodedMessage){
	return "<tr><td>" + from + "</td><td>" + message + "</td><td>" + decoded + "</td></tr>";
}

function sendMessage(from, to, message){
	console.log("From: " + from + "\nTo: " + to + "\nMessage: " + message);
	firebaseSendMessage(from, to, message);
};

/*
* Collect 'from', 'to', and 'message' data from page and send the 'message'
* to the 'to' user from the 'from' user
*/
function send(){
	var from = $(USERNAME).val();
	var to = $(TO_USER_SELECT).val();
	var message = $(MESSAGE).val();
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
	var decodedMessage = Translator.translate(message);
	var newRow = createInboxTableRow(from, message, decodedMessage);
	$(LAST_INBOX_ROW).after(newRow);
}

/*
* Populate the user select element with all
* names from the users array
*/
function updateUserSelect(){
	$(TO_USER_SELECT).empty();
	for(var index in users){
		$(TO_USER_SELECT).append(createUserRow(users[index]));
	}
}

/*
* Add an online user to the display
*
* @param: username - (string) name of the online user
*/
function addUserToDisplay(username){
    users.push(username);
    updateUserSelect();
}

$(document).ready(function(){
	$(SEND_BUTTON).click(send);
});