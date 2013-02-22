/* Import node's http module: */
var http = require("http");
var router = require('./router');

var requestListener = function (request, response) {
  router.router(request, response);
};


var port = 8080;

var ip = "127.0.0.1";

var server = http.createServer(requestListener);
// console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
