const Model = require('../models/activity')
const { DBHelper } = require('../utils/db')

class ActivityHelper extends DBHelper {
  constructor() {
    super(Model)
  }
}

module.exports = new ActivityHelper()
