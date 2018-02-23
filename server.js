const db = require('./store/db');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const hostname = '0.0.0.0';
const port = 8000;


// The GraphQL schema in string form
const typeDefs = `
  type Query { 
    accounts: [Account] 
  }
  type Account { 
    user_name: String, 
    user_password: String 
  }
`;

function findAccount(search) {
  return db.select().from('accounts');
}

// The resolvers
const resolvers = {
  Query: { 
    accounts: (_, {username}) => 
      findAccount({ user_name: username }).then(
        rows => rows
      )
  }
};
  
// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(8000, () => {
  console.log('Go to http://localhost:8000/graphiql to run queries!');
});
