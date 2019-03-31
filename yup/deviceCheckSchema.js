const yup = require('yup')

const deviceCheckSchema = type => {
  switch (type) {
    case 'createDevice':
      return yup.object().shape({
        deviceName: yup.string().required(),
        deviceType: yup.string().required(),
        isDeviceApiControlled: yup.string().required(),
        deviceProtocol: yup.string().required(),
        deviceIPAddress: yup.string().required(),
        devicePortNumber: yup.string().required(),
        deviceExtNo: yup.string().required(),
        deviceUsername: yup.string().required(),
        devicePassword: yup.string().required(),
        deviceNumberAddr: yup.string().required(),
        modifiedBy: yup.string().required(),
        userID: yup.string().required()
      })
    case 'updateDevice':
      return yup.object().shape({
        deviceName: yup.string(),
        deviceType: yup.string(),
        isDeviceApiControlled: yup.string(),
        deviceProtocol: yup.string(),
        deviceIPAddress: yup.string(),
        devicePortNumber: yup.string(),
        deviceExtNo: yup.string(),
        deviceUsername: yup.string(),
        devicePassword: yup.string(),
        deviceNumberAddr: yup.string(),
        modifiedBy: yup.string(),
        userID: yup.string()
      })
    default:
      return yup.object().shape()
  }
}

module.exports = deviceCheckSchema
