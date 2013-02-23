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
      globals.messageLog = usrs;
    });
//  });
});


var returnMessages = function(request, response){
		response.writeHead(200, globals.defaultCorsHeaders);
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
      var obj = JSON.parse(string);
      orm.message.create(obj);
			globals.messageLog.push(obj);
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