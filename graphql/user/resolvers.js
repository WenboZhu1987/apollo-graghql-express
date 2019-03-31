const {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByEmailAndId,
  createUser,
  updateUser,
  deleteUser
} = require('../../repos/UserRepo')
const userCheckSchema = require('../../yup/userCheckSchema')
const formatYupError = require('../../utils/formatYupError')

const resolvers = {
  Query: {
    getUsers: async () => {
      const users = await getUsers()
      return users
    },
    getUser: async (_, { id }) => {
      const user = await getUserById(id)
      return user
    }
  },
  Mutation: {
    createUser: async (_, args) => {
      try {
        await userCheckSchema('createUser').validate(args.userInput, {
          abortEarly: false
        })
        const { email } = args.userInput
        const userInDb = await getUserByEmail(email)
        if (userInDb) {
          return [
            {
              path: 'email',
              message: 'email is already taken'
            }
          ]
        }
      } catch (err) {
        const errors = await formatYupError(err)
        return errors
      }

      await createUser(args.userInput)
      return null
    },
    updateUser: async (_, args) => {
      const {
        id,
        userInput: { email }
      } = args
      try {
        await userCheckSchema('updateUser').validate(args.userInput, {
          abortEarly: false
        })

        // check if current user owns current email
        const userInDb = await getUserByEmailAndId(email, id)
        // if not, then check if current email is already owned by other users
        if (!userInDb) {
          const otherUserInDb = await getUserByEmail(email)
          if (otherUserInDb) {
            return [
              {
                path: 'email',
                message: 'email is already taken'
              }
            ]
          }
        }
      } catch (err) {
        const errors = await formatYupError(err)
        return errors
      }
      await updateUser(id, args.userInput)
      return null
    },
    deleteUser: async (_, { id }) => {
      await deleteUser(id)
      return null
    }
  }
}

module.exports = {
  resolvers
}
