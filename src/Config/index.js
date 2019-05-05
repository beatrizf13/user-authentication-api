class Config {
  constructor () {
    this.getSecret()
  }

  getSecret () {
    const secret = 'ab681ab35f8f6ee19b2c119406982b56'
    return secret
  }
}

module.exports = new Config()
