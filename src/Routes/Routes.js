const express = require('express')

const UserController = require('../App/Controllers/UserController')
const SessionController = require('../App/Controllers/SessionController')
const AuthMiddleware = require('../App/Middlewares/Authenticate')

class Routes {
  publicRoutes () {
    const routes = express.Router()

    routes.post('/sessions', SessionController.store)

    routes.get('/users', UserController.index)
    routes.get('/users/:id', UserController.show)
    routes.post('/users', UserController.store)
    routes.put('/users/:id', UserController.update)
    routes.delete('/users/:id', UserController.destroy)

    return routes
  }

  privateRoutes () {
    const routes = express.Router()

    routes.use(AuthMiddleware.verifyToken)

    routes.get('/app', (req, res) => {
      res.send({
        app: 'app'
      })
    })

    return routes
  }
}

module.exports = new Routes()
