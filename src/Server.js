const app = require('./App')

class Server {
  constructor () {
    const port = process.env.PORT || 3000

    app.listen(port)

    console.log('Listening on port ' + port)
  }
}

module.exports = new Server()
