const Model = require('../models/poster')
const { DBHelper } = require('../utils/db')

class PosterHelper extends DBHelper {
  constructor() {
    super(Model)
  }
}

module.exports = new PosterHelper()
