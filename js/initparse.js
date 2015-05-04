//Initialize Parse JS SDK
Parse.initialize("VfbdwjDu0SrnwEo1P4kdgZAKAlUhzdFUjV05fRKk", "3LDL1LlOf5BHtnQGkosGltIluvVxYWxhbUTdeBqQ");
Parse.User.enableRevocableSession()
var CurrentUserVar = Parse.User.current();
var SessionToken = CurrentUserVar.getSessionToken();
var USERNAME4COMMENTS = CurrentUserVar.getUsername();
