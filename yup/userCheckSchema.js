const yup = require('yup')

const userCheckSchema = type => {
  switch (type) {
    case 'createUser':
      return yup.object().shape({
        name: yup.string().required(),
        email: yup
          .string()
          .email()
          .required(),
        role: yup.string().required(),
        password: yup
          .string()
          .min(6)
          .required()
      })
    case 'updateUser':
      return yup.object().shape({
        name: yup.string(),
        email: yup.string().email(),
        role: yup.string(),
        password: yup.string()
      })
    default:
      return yup.object().shape()
  }
}

module.exports = userCheckSchema
