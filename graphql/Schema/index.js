const { gql } = require('apollo-server-express')

const Schema = gql`
  type Query {
    hello: String
    getDevices: [Device!]
    getDevice(id: ID!): Device
  }

  type Mutation {
    createDevice(deviceInput: DeviceInput!): [Error!]
    updateDevice(id: ID!, deviceInput: DeviceInput!): [Error!]
    deleteDevice(id: ID!): [Error!]
  }

  type Device {
    _id: ID!
    deviceName: String!
    deviceType: String!
    isDeviceApiControlled: String!
    deviceProtocol: String!
    deviceIPAddress: String!
    devicePortNumber: String!
    deviceExtNo: String!
    deviceUsername: String!
    devicePassword: String!
    deviceNumberAddr: String!
    modifiedBy: String!
    userID: String!
  }

  type Error {
    path: String!
    message: String!
  }

  input DeviceInput {
    deviceName: String!
    deviceType: String!
    isDeviceApiControlled: String!
    deviceProtocol: String!
    deviceIPAddress: String!
    devicePortNumber: String!
    deviceExtNo: String!
    deviceUsername: String!
    devicePassword: String!
    deviceNumberAddr: String!
    modifiedBy: String!
    userID: String!
  }
`
module.exports = Schema
