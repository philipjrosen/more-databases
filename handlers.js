var globals = require('./globals');
var fs = require('fs');
var orm = require('./orm-example');

/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
orm.message.sync(); //.success(function() {});
 // Retrieve objects from the database:
// orm.message.findAll({}).success(function(usrs) {
//       globals.messageLog = usrs;
//     });
var messages = [];
orm.message.findAll().success(function(usrs) {
  console.log("Inside ORM");
  messages = usrs;
    });

var returnMessages = function(request, response){
		response.writeHead(200, globals.defaultCorsHeaders);
		response.end(JSON.stringify(messages));
};

var postMessages = function(request, response){
		var string = "";
		request.setEncoding();
		response.writeHead(302, globals.defaultCorsHeaders);
		request.on('data', function(data){
			string += data
		});
		request.on('end', function(){
      var obj = JSON.parse(string);
      orm.message.create(obj);
			messages.push(obj);
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