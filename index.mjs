import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import typeDefs from './schema.js'

async function startApolloServer(typeDefs, resolvers) {
  const app = express()

  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()

  server.applyMiddleware({ app })

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve))

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}


const users = [
  {
    name: 'The Awakeninag',
  },
  {
    name: 'City of Glass',
  },
]

const resolvers = {
  Query: {
    users: () => users,
  },
}

startApolloServer(typeDefs, resolvers)
