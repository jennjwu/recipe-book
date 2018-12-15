"use strict";

const PORT = process.env.PORT || 3000;
var express = require("express");
var app = express();
var graphqlHTTP = require('express-graphql');
var { graphql, buildSchema } = require('graphql');


// Graphql
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

app.get("/", function (req, res) {
    logRequest(req, null);

    // Run the GraphQL query '{ hello }' and print out the response
    graphql(schema, '{ hello }', root).then((response) => {
      console.log(response);
    });

    res.json("hello world");
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// helper to log requests to server
function logRequest(req, body) {
    console.log("Server received", req.method, "request on", req.url);
    if (body != null) {
        console.log("with body")
        console.log(body);
    }
}

var startServer = app.listen(PORT, function() {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = startServer;
