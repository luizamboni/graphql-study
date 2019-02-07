const { ApolloServer, gql } = require('apollo-server');

// rest APIs
const usersApi = require("./api/users")
const terminalsApi = require("./api/terminals")
const billingApi = require("./api/billing")


// Construct a schema, using GraphQL schema language
const typeDefs = gql`

  type Query {
    users: [ User ],
    user(id: Int!): User
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
    users: (parent, args, context, info) => {
      console.log("user parent:", parent)
      console.log("uer args:", args)

      return usersApi.getUsers()
    },

    user: (parent, { id }) => {
      console.log(parent)
      // console.log(args)
      return usersApi.getUsers().then(users => users.find(u => u.id === id ))
    }, 
  },

  User: {
    terminals: (parent, args, context, info) => {
      console.log("terminals parent:", parent)
      console.log("terminals args:", args)

      return terminalsApi.getTerminals().then(data => {
        return data.filter(t => t.user_id === parent.id)
      })
    }
  },

  Terminal: {
    invoices: (parent, args, context, info) => { 
      console.log(parent)

      return billingApi.getInvoices().then(data => {
        return data.filter(i => i.terminal_id === parent.id)
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