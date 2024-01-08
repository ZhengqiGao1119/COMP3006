const Model = require('../models/daily')
const { DBHelper } = require('../utils/db')

class DailyHelper extends DBHelper {
  constructor() {
    super(Model)
  }
}

module.exports = new DailyHelper()
