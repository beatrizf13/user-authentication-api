const jwt = require('jsonwebtoken')
const Config = require('../../src/Config')

class Authenticate {
  verifyToken (req, res, next) {
    const authConfig = Config.getSecret()

    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).send({ error: 'no token provided' })
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
      return res.status(401).send({ error: 'token error' })
    }

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).send({ error: 'token malformatted' })
    }

    jwt.verify(token, authConfig, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'token invalid' })
      }

      req.userId = decoded.id
      return next()
    })
  }
}

module.exports = new Authenticate()
