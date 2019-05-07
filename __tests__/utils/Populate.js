const faker = require('faker')
const User = require('../../src/Models/UserModel')

class Populate {
  async user (fullName, email, password) {
    const user = await User.create({
      fullName: fullName || faker.name.findName(),
      email: email || faker.internet.email(),
      password: password || faker.internet.password()
    })

    return user
  }

  async users (quantity) {
    let users = []

    for (let i = 0; i < quantity; i++) {
      let user = await User.create({
        fullName: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      })

      users = [...users, user]
    }

    return users
  }
}
module.exports = new Populate()
