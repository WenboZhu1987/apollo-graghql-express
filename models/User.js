const mongoose = require('mongoose')
const { createHashedPassword } = require('../utils/security')
const { emailValidator } = require('./validators')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: [true, 'User email required'],
      validate: {
        validator: emailValidator,
        message: props => `${props.value} is not a valid email address!`
      }
    },
    role: {
      type: String,
      required: true
    },
    password: {
      type: String,
      min: [6, 'Password should be at lease 6 digits long'],
      required: true
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function(next) {
  // you can't use fat arrow function here, otherwise you lost the current user
  const user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  try {
    const hash = await createHashedPassword(user.password)
    user.password = hash
    return next()
  } catch (e) {
    return next(e)
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }
