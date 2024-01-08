const Model = require('../models/we')
const { DBHelper } = require('../utils/db')
const UserHelper = require('./user')

class WeHelper extends DBHelper {
  constructor() {
    super(Model)
  }

  async findSome() {
    const data = await super.findSome()
    const result = []

    for (let i = 0; i < data.docs.length; i++) {
      let t = data.docs[i]
      const user = await UserHelper.findById(t.uid)
      result.push({
        user: user,
        workerEvaluate: t
      })
    }
    return result
  }
}

module.exports = new WeHelper()
