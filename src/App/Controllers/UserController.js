const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../Models/UserModel')
const secret = require('../../Config/Secret').getSecret()

function generateJWTToken (params = {}) {
  return jwt.sign(params, secret, { expiresIn: 86400 })
}

class UserController {
  async index (req, res) {
    try {
      const users = await User.find()

      return res.send(users)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async show (req, res) {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(400).send({ error: 'user not found' })
      }

      return res.send(user)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async store (req, res) {
    try {
      const { fullName, email, password } = req.body

      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'email already exists' })
      }

      const user = await User.create({ fullName, email, password })

      user.password = undefined

      return res.send({
        user,
        token: generateJWTToken({ id: user._id })
      })
    } catch (error) {
      return res.status(500).send({ error })
    }
  }
  
  async update (req, res) {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(400).send({ error: 'user not found' })
      }

      let { email, password } = req.body

      const fullName = req.body.fullName || user.fullName

      if (email) {
        if (await User.findOne({ email })) {
          return res.status(400).send({ error: 'email already exists' })
        }
      } else {
        email = user.email
      }

      if (!password) {
        password = user.password
      } else {
        password = await bcrypt.hash(req.body.password, 10)
      }

      await User.findOneAndUpdate(
        req.params.id,
        { fullName, email, password },
        {
          new: true
        }
      )

      return res.send(user)
    } catch (error) {
      return res.status(500).send({ error })
    }
  }

  async destroy (req, res) {
    try {
      if (!(await User.findById(req.params.id))) {
        return res.status(400).send({ error: 'user not found' })
      }

      await User.findByIdAndDelete(req.params.id)

      return res.send()
    } catch (error) {
      return res.status(500).send({ error })
    }
  }
}

module.exports = new UserController()
