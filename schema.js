
const typeDefs = `
  type User {
    name: String
  }

  type Query {
    users: [User]
  }
`

module.exports = typeDefs
