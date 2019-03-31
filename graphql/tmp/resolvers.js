const resolvers = {
  Query: {
    hello: () => {
      return 'hello world'
    }
  }
}

module.exports = {
  resolvers
}
