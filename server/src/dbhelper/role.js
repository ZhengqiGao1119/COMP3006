const Model = require('../models/role')
const { DBHelper } = require('../utils/db')

class RoleHelper extends DBHelper {
  constructor() {
    super(Model)
  }
}

module.exports = new RoleHelper()
