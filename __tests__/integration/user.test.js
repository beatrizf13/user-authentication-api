/* eslint-disable */
const request = require('supertest')
const bcrypt = require('bcryptjs')
const factory = require('../factories')

const App = require('../../src/App')
const Trucate = require('../utils/Trucate')

describe('User', () => {
  beforeEach(async () => {
    await Trucate.removeAllCollections()
  })

  test('should be return a array of users', async () => {
    const response = await request(App).get('/api/users')

    expect(response.status).toBe(200)
  })

  test('should encrypt user password', async () => {
    const user = await factory.create('User', {
      password: 'mypass'
    })

    const compareHash = await bcrypt.compare('mypass', user.password)

    expect(compareHash).toBe(true)
  })
})
