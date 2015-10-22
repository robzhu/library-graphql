var express = require('express');
var graphqlHTTP = require('express-graphql');
var appSchema = require('./graphqlSchema');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/graphql', graphqlHTTP({ schema: appSchema, graphiql: true}));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
