/* eslint-disable */
const request = require('supertest')
const bcrypt = require('bcryptjs')
const Factory = require('../factories')

const App = require('../../src/App')
const Trucate = require('../utils/Trucate')
const Populate = require('../utils/Populate')

const User = require('../../src/Models/UserModel')

describe('User', () => {
  afterAll(() => setTimeout(() => process.exit(), 1000))

  afterEach(async () => {
    await Trucate.users()
  })

  it('should be created a user', async done => {
    const user = await Factory.create('User', {
      fullName: 'Doe'
    })

    expect(user).toHaveProperty('_id')
    expect(user).toHaveProperty('fullName', 'Doe')

    done()
  })

  it('should encrypt user password', async done => {
    const user = await Factory.create('User', {
      password: 'mypass123'
    })

    const compareHash = await bcrypt.compare('mypass123', user.password)

    expect(compareHash).toBe(true)

    done()
  })

  it('should be return a array of users', async done => {
    await Populate.users(3)

    const response = await request(App).get('/api/users')

    expect(response.status).toBe(200)

    done()
  })

  it('should be return one user', async done => {
    const user = await Populate.user()

    const response = await request(App).get(`/api/users/${user._id}`)

    expect(response.status).toBe(200)

    done()
  })

  it('should be delete a user', async done => {
    const user = await Populate.user()

    let response = await request(App).delete(`/api/users/${user._id}`)

    expect(response.status).toBe(200)

    response = await request(App).get(`/api/users/${user._id}`)

    expect(response.status).toBe(400)

    done()
  })

  it('should be update a user', async done => {
    let user = await Factory.create('User', {
      fullName: 'Doe'
    })

    let response = await request(App)
      .put(`/api/users/${user._id}`)
      .send({
        fullName: 'Foo'
      })

    expect(response.status).toBe(200)

    user = await User.findById(user._id)

    expect(user).toHaveProperty('fullName', 'Foo')

    done()
  })
})
