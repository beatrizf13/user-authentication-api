/* eslint-disable */
const request = require('supertest')
const bcrypt = require('bcryptjs')

const App = require('../../src/App')
const User = require('../../src/Models/UserModel')
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
    const user = await User.create({
      fullName: 'Beatriz Felix',
      email: 'beatriz@beatriz.com',
      password: 'mypass'
    })

    const compareHash = await bcrypt.compare('mypass', user.password)

    expect(compareHash).toBe(true)
  })
})
