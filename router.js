var handlers = require('./handlers');
var globals = require('./globals');
var fs = require('fs');


var router = function(request, response) {
	console.log("Serving request type " + request.method + " for url " + request.url);
		if(request.url === '/'){
				handlers.serveFile(request, response);
		}	
		else if (request.url === '/classes/messages'){
			// console.log("Inside //classes//messages: ");
			// console.log(request.method);
			if(request.method === 'OPTIONS'){
				response.writeHead(globals.defaultCorsHeaders);
				console.log("Write head opitions!")
			}
			if(request.method === 'GET'){
				console.log("Inside GET: ");
				handlers.returnMessages(request, response);
			}
			if(request.method === 'POST'){
				handlers.postMessages(request, response);
			}
		}	else {
			response.writeHead(200);
			fs.createReadStream(__dirname + request.url).pipe(response);
		}
};

exports.router = router;