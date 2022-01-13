var data = require('./mymodule');

var display_name = data.name('Adnana', 'Muresan');
console.log(display_name);

var display_email = data.mail('Jack', 'you got a new message', 'how are you');
console.log(display_email);