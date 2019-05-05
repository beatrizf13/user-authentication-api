/* eslint-disable */
const request = require('supertest')

const App = require('../../src/App')
const User = require('../../src/Models/UserModel')
const Trucate = require('../utils/Trucate')

describe('Users', () => {
  beforeEach(async () => {
    await Trucate.removeAllCollections()
  })

  it('should be return a array of users', async () => {
    const response = await request(App).get('/api/users')

    expect(response.status).toBe(200)
  })
})
