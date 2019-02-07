const { ApolloServer, gql } = require('apollo-server');

// rest APIs
const usersApi = require("./api/users")
const terminalsApi = require("./api/terminals")
const billingApi = require("./api/billing")


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    users: [ User ],
  }

  type User {
    id: Int
    name: String
    email: String
    terminals: [ Terminal ]
  }

  type Terminal {
    id: String
    user_id: Int
    invoices: [ Invoice ]
  }

  type Invoice {
    terminal_id: String
    date: String
    value: Float
    paid: Boolean
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  // the root queries
  Query: {
    users: (obj, args, context, info) => {
      console.log(obj)
      return usersApi.getUsers()
    }
  }, 

  User: {
    terminals: (obj, args, context, info) => {
      console.log(obj)

      return terminalsApi.getTerminals().then(data => {
        return data.filter(t => t.user_id === obj.id)
      })
    }
  },

  Terminal: {
    invoices: (obj, args, context, info) => { 
      console.log(obj)

      return billingApi.getInvoices().then(data => {
        return data.filter(i => i.terminal_id === obj.id)
      })
    }
  }

};

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});


server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});