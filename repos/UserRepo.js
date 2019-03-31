const { User } = require('../models/User')

const getUsers = async () => {
  const users = await User.find({})
  return users
}

const getUserById = async id => {
  if (!id) throw Error('Invalid user id')
  const user = await User.findOne({ _id: id })
  return user
}

const getUserByEmail = async email => {
  if (!email) throw Error('Invalid user email')
  const user = await User.findOne({ email })
  return user
}

const getUserByEmailAndId = async (email, id) => {
  if (!email) throw Error('Invalid user email')
  if (!id) throw Error('Invalid user id')
  const user = await User.findOne({ email, _id: id })
  return user
}

const createUser = async user => {
  if (!user) throw Error('invalid user object')
  await User.create(user)
}

const updateUser = async (id, user) => {
  if (!id) throw Error('Invalid user id')
  if (!user) throw Error('invalid user object')
  let userInDb = await User.findOne({ _id: id })
  if (!userInDb) throw Error('User does not exist')

  for (const key in user) userInDb[key] = user[key]
  await userInDb.save()
}

const deleteUser = async id => {
  if (!id) throw Error('Invalid user id')
  await User.findOneAndRemove({ _id: id })
}

module.exports = {
  getUsers,
  getUserById,
  getUserByEmail,
  getUserByEmailAndId,
  createUser,
  updateUser,
  deleteUser
}
