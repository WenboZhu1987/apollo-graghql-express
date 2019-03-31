const { login } = require('../../services/authService')

const resolvers = {
  Query: {
    login: async (_, args) => {
      const authInfo = await login(args.loginInput)
      return authInfo
    }
  }
}

module.exports = {
  resolvers
}
