const User = require('../models/User')

class UserController {
  async index (req, res) {
    try {
      const users = await User.find()

      return res.send(users)
    } catch (err) {
      return res.status(400).send({ error: err })
    }
  }

  async show (req, res) {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(400).send({ error: 'user not found' })
      }

      return res.send(user)
    } catch (err) {
      return res.status(400).send({ error: err })
    }
  }

  async store (req, res) {
    try {
      const { email, username } = req.body

      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'email already exists' })
      }

      if (await User.findOne({ username })) {
        return res.status(400).send({ error: 'username already exists' })
      }

      const user = await User.create(req.body)

      return res.send(user)
    } catch (err) {
      return res.status(400).send({ error: err })
    }
  }

  async update (req, res) {
    try {
      const { email, username } = req.body
      let user = await User.findById(req.params.id)

      if (!user) {
        return res.status(400).send({ error: 'user not found' })
      }

      if (await User.findOne({ email })) {
        return res.status(400).send({ error: 'email already exists' })
      }

      if (await User.findOne({ username })) {
        return res.status(400).send({ error: 'username already exists' })
      }

      user = await User.findOneAndUpdate(req.params.id, req.body, {
        new: true
      })

      return res.send(user)
    } catch (err) {
      return res.status(400).send({ error: err })
    }
  }

  async destroy (req, res) {
    try {
      const user = await User.findById(req.params.id)

      if (!user) {
        return res.status(400).send({ error: 'user not found' })
      }

      await User.findByIdAndDelete(req.params.id)

      return res.send()
    } catch (err) {
      return res.status(400).send({ error: err })
    }
  }
}

module.exports = new UserController()
