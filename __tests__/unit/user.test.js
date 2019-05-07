/* eslint-disable */
const request = require('supertest')
const bcrypt = require('bcryptjs')
const Factory = require('../factories')

const App = require('../../src/App')
const Trucate = require('../utils/Trucate')
const Populate = require('../utils/Populate')

describe('User', () => {
  afterEach(async () => {
    await Trucate.users()
  })

  it('should be return a array of users', async () => {
    await Populate.users(5)

    const response = await request(App).get('/api/users')

    expect(response.status).toBe(200)
  })

  it('should encrypt user password', async () => {
    const user = await Factory.create('User', {
      password: 'mypass'
    })

    const compareHash = await bcrypt.compare('mypass', user.password)

    expect(compareHash).toBe(true)
  })
})
