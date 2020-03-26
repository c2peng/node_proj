const http = require('http');
const routes = require('./routes')
//called by node.js whenever request reaches the server
const server = http.createServer(routes);

server.listen(3000); // keep this running