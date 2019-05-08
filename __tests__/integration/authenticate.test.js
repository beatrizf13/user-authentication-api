/* eslint-disable */
const request = require('supertest')

const App = require('../../src/App')
const Trucate = require('../utils/Trucate')
const Populate = require('../utils/Populate')

describe('User', () => {
  afterAll(() => setTimeout(() => process.exit(), 5000))

  afterEach(async () => {
    await Trucate.users()
  })

  it('should return jwt token when authenticated', async done => {
    const user = await Populate.user(null, null, 'mypass123')

    const response = await request(App)
      .post('/api/authenticate')
      .send({
        email: user.email,
        password: 'mypass123'
      })

    done()
  })

  it('should authenticate with valid credentials', async done => {
    const user = await Populate.user(null, null, 'mypass123')

    const response = await request(App)
      .post('/api/authenticate')
      .send({
        email: user.email,
        password: 'mypass123'
      })

    expect(response.status).toBe(200)

    done()
  })

  it('should not authenticate with invalid credentials', async done => {
    const user = await Populate.user(null, null, 'mypass123')

    const response = await request(App)
      .post('/api/authenticate')
      .send({
        email: user.email,
        password: '123456'
      })

    expect(response.status).toBe(400)

    done()
  })

  it('should be able to access private routes when authenticated', async done => {
    const user = await Populate.user(null, null, 'mypass123')

    let response = await request(App)
      .post('/api/authenticate')
      .send({
        email: user.email,
        password: 'mypass123'
      })

    expect(response.status).toBe(200)

    response = await request(App)
      .get('/api/app')
      .set('Authorization', `Bearer ${response.body.token}`)

    expect(response.status).toBe(200)

    done()
  })

  it('should not be able to access private routes without jwt token', async done => {
    const response = await request(App).get('/api/app')

    expect(response.status).toBe(401)

    done()
  })

  it('should not be able to access private routes with invalid jwt token', async done => {
    const response = await request(App)
      .get('/api/app')
      .set('Authorization', `Bearer 123123`)

    expect(response.status).toBe(401)

    done()
  })
})
