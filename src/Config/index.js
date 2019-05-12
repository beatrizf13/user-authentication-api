/* eslint-disable no-unused-vars */
class Config {
  constructor () {
    const secret = 'ab681ab35f8f6ee19b2c119406982b56'
  }

  getSecret () {
    return this.secret
  }
}

module.exports = new Config()
