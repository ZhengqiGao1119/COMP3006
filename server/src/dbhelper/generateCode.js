const Model = require('../models/generateCode')
const { DBHelper } = require('../utils/db')

class GenerateCodeHelper extends DBHelper {
  constructor() {
    super(Model)
  }
}

module.exports = new GenerateCodeHelper()
