const Model = require('../models/user')
const { DBHelper } = require('../utils/db')

class UserHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  findSome(query) {
    
    if (query.username) {
      query.username = {
        $regex: new RegExp(query.username, 'i')
      }
    } else {
      delete query.username
    }
    return super.findSome(query)
  }
}

module.exports = new UserHelper()
