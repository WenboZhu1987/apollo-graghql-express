const {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice
} = require('../../repos/DeviceRepo')
const deviceCheckSchema = require('../../yup/deviceCheckSchema')
const formatYupError = require('../../utils/formatYupError')

const resolver = {
  Query: {
    getDevices: async () => {
      const devices = await getDevices()
      return devices
    },
    getDevice: async (_, { id }) => {
      const device = await getDeviceById(id)
      return device
    }
  },
  Mutation: {
    createDevice: async (_, args) => {
      try {
        await deviceCheckSchema('createDevice').validate(args.deviceInput, {
          abortEarly: false
        })
      } catch (err) {
        const errors = formatYupError(err)
        return errors
      }
      await createDevice(args.deviceInput)
      return null
    },
    updateDevice: async (_, args) => {
      try {
        await deviceCheckSchema('updateDevice').validate(args.deviceInput, {
          abortEarly: false
        })
      } catch (err) {
        const errors = formatYupError(err)
        return errors
      }
      await updateDevice(args.id, args.deviceInput)
      return null
    },
    deleteDevice: async (_, { id }) => {
      await deleteDevice(id)
      return null
    }
  }
}

module.exports = resolver
