const Model = require('../models/fe')
const { DBHelper } = require('../utils/db')
const UserHelper = require('./user')

class FeHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  async findSome(query) {
    if (!query.limit) {
      query.limit = 1000000
      query.page = 1
    }
    const data = await super.findSome(query)
    const result = []

    for (let i = 0; i < data.docs.length; i++) {
      let t = data.docs[i]
      const user = await UserHelper.findById(t.uid)
      result.push({
        user: user,
        filmEvaluate: t
      })
    }
    data.docs = result
    return data

  }
}

module.exports = new FeHelper()
