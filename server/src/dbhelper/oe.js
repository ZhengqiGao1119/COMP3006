const Model = require('../models/oe')
const { DBHelper } = require('../utils/db')

class OeHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  findSome(query) {
    if (query.reviewer) {
      query.reviewer = {
        $regex: new RegExp(query.reviewer, 'i')
      }
    } else {
      delete query.reviewer
    }
    return super.findSome(query)
  }
}

module.exports = new OeHelper()
