const Model = require('../models/lm')
const { DBHelper } = require('../utils/db')
const UserHelper = require('./user')

class LmHelper extends DBHelper {
  constructor() {
    super(Model)
  }

  async findSome(query) {
    const data = await super.findSome(query)
    const result = []

    for (let i = 0; i < data.docs.length; i++) {
      let t = data.docs[i]
      const user = await UserHelper.findById(t.uid)
      result.push({
        user: user,
        leavingMessage: t
      })
    }
    data.docs = result
    return data
  }

  async findAll() {
    const uids = await this.Model.distinct('uid')
    const result = []
    for (let i = 0; i < uids.length; i++) {
      let uid = uids[i]
      const user = await UserHelper.findById(uid)
      result.push({
        user: user
      })
    }
    return result
  }
}

module.exports = new LmHelper()
