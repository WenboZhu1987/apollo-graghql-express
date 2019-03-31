const { hash, genSalt } = require('bcryptjs')

const createHashedPassword = async password => {
  const salt = await genSalt(12)
  const hashedPassword = await hash(password, salt)
  return hashedPassword
}

module.exports = {
  createHashedPassword
}
