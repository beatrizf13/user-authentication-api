/* eslint-disable */
const request = require('supertest')
const bcrypt = require('bcryptjs')

const App = require('../../src/App')
const Trucate = require('../utils/Trucate')
const Populate = require('../utils/Populate')

describe('User', () => {
  afterAll(() => setTimeout(() => process.exit(), 5000))

  afterEach(async () => {
    await Trucate.users()
  })

  it('should be created a user in database', async done => {
    const user = await Populate.user()

    expect(user).toHaveProperty('_id')

    done()
  })

  it('should encrypt user password', async done => {
    const user = await Populate.user(null, null, 'mypass123')

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
    const user = await Populate.user('Foo')

    const response = await request(App).get(`/api/users/${user._id}`)

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('fullName', 'Foo')

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
    const user = await Populate.user('Doe')

    const response = await request(App)
      .put(`/api/users/${user._id}`)
      .send({
        fullName: 'Foo'
      })

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('fullName', 'Foo')

    done()
  })
})
