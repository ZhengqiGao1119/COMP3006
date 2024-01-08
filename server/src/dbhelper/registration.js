const Model = require('../models/registration')
const { DBHelper } = require('../utils/db')
const activityHelper = require('./activity')

class RegistrationHelper extends DBHelper {
  constructor() {
    super(Model)
  }

  async save(data) {
    const a = await activityHelper.findById(data.aid)
    await activityHelper.update({_id: a._id}, {number: (a.number || 0)+1})
    return await super.save(data)
  }
}

module.exports = new RegistrationHelper()
