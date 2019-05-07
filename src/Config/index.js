class Config {
  constructor () {
    this.getSecret()
  }

  getSecret () {
    const _secret = 'ab681ab35f8f6ee19b2c119406982b56'
    return _secret
  }
}

module.exports = new Config()
