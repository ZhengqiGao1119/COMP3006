const config = require('../config/index')
const bcrypt = require('bcrypt')


class BcryptUtil {
  saltRound
  constructor(options = {}) {
    if (!options.saltRound) throw 'saltRound is null'
    this.saltRound = options.saltRound
  }
  genPassword(password) {
    return bcrypt.hashSync(password, this.saltRound)
  }
  comparePassword(p1, p2) {
    return bcrypt.compareSync(p1, p2)
  }
}

module.exports = new BcryptUtil(config)