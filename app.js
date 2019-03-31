const express = require('express')
const { ApolloServer } = require('apollo-server-express')
require('dotenv').config()
const typeDefs = require('./graphql/Schema')
const resolvers = require('./graphql/Resolver')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  require('./db/mongo')
})
