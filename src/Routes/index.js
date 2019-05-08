const express = require('express')

const UserController = require('../Controllers/UserController')
const AuthMiddlewares = require('../Middlewares/Authenticate')

class Routes {
  publicRoutes () {
    const routes = express.Router()

    routes.post('/authenticate', UserController.authenticate)
    routes.get('/users', UserController.index)
    routes.get('/users/:id', UserController.show)
    routes.post('/users', UserController.store)
    routes.put('/users/:id', UserController.update)
    routes.delete('/users/:id', UserController.destroy)

    return routes
  }

  privateRoutes () {
    const routes = express.Router()

    routes.use(AuthMiddlewares.verifyToken)

    routes.get('/app', (req, res) => {
      res.send({
        app: 'app'
      })
    })

    return routes
  }
}

module.exports = new Routes()
