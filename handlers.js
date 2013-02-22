var globals = require('./globals');
var fs = require('fs');
var orm = require('./orm-example');

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
orm.message.sync().success(function() {


  // now instantiate an object and save it:
  // var newMessage = orm.message.build({username: "John Valjean", text: "This is my Message", roomname: "Test"});
  // newMessage.save().success(function() {
    // Retrieve objects from the database:
    orm.message.findAll({}).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        //console.log(JSON.stringify(usrs[i]));
        globals.messageLog.push(JSON.stringify(usrs[i]));
      }
    });
//  });
});


var returnMessages = function(request, response){
		response.writeHead(200, globals.defaultCorsHeaders);
    //console.log("messageLog: " + globals.messageLog);
		response.end(JSON.stringify(globals.messageLog));
};

var postMessages = function(request, response){
		var string = "";
		request.setEncoding();
		response.writeHead(302, globals.defaultCorsHeaders);
		request.on('data', function(data){
			string += data
		});
		request.on('end', function(){
  		// query = dbConnection.query('INSERT INTO megatesttable SET ?', JSON.parse(string), function(err, result){} );
      orm.message.create(JSON.parse(string));
			globals.messageLog.push(string);
			fs.writeFile('log.txt', globals.messageLog);
			response.end();
		});
};

var serveFile = function(request, response){
			response.writeHead(200, {'Content-Type': 'text/html'});
			fs.createReadStream(__dirname + '/index.html').pipe(response);
			// read.pipe(fs.readFileSync('index.html', 'utf-8'));
};


exports.returnMessages = returnMessages;
exports.postMessages = postMessages;
exports.serveFile = serveFile;