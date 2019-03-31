const { Device } = require('../models/Device')

const getDevices = async () => {
  const devices = await Device.find({})
  return devices
}

const getDeviceById = async id => {
  if (!id) throw Error('id is required.')
  const device = await Device.findOne({ _id: id })
  return device
}

const createDevice = async device => {
  await Device.create(device)
}

const updateDevice = async (id, device) => {
  if (!id) throw Error('id is required.')
  const deviceInDb = await Device.findOne({ _id: id })
  if (!deviceInDb) throw Error('user does not exist')
  for (const key in device) deviceInDb[key] = device[key]
  await deviceInDb.save()
}

const deleteDevice = async id => {
  await Device.findByIdAndRemove(id)
}

module.exports = {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice
}
