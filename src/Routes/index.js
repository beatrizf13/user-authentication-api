const express = require('express')

const UserController = require('../Controllers/UserController')

class Routes {
  constructor () {
    const routes = express.Router()

    routes.post('/authenticate', UserController.authenticate)
    routes.get('/users', UserController.index)
    routes.get('/users/:id', UserController.show)
    routes.post('/users', UserController.store)
    routes.put('/users/:id', UserController.update)
    routes.delete('/users/:id', UserController.destroy)

    return routes
  }
}

module.exports = new Routes()
