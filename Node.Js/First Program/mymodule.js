exports.name = function (firstname, lastname){
    return "hello" + " " + firstname + " " + lastname;
}

exports.mail = function (sendername, message, subject){
    return sendername + '\n' + message + '\n' + subject;
}