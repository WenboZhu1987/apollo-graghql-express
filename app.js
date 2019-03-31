const express = require('express')
const path = require('path')
const fs = require('fs')
require('dotenv').config()
const { ApolloServer } = require('apollo-server-express')
const { importSchema } = require('graphql-import')
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools')

const schemas = []
const folders = fs.readdirSync(path.join(__dirname, './graphql'))
// import all subschemas from src/modules folder
folders.forEach(folder => {
  // DO NOT import modules/shared folder
  if (folder.indexOf('shared') != -1) return
  const { resolvers } = require(`./graphql/${folder}/resolvers`)
  const typeDefs = importSchema(
    path.join(__dirname, `./graphql/${folder}/schema.graphql`)
  )
  schemas.push(makeExecutableSchema({ resolvers, typeDefs }))
})

const server = new ApolloServer({
  schema: mergeSchemas({ schemas })
})

const app = express()
server.applyMiddleware({ app })

app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000`)
  require('./db/mongo')
})
