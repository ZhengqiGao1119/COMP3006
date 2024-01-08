const Model = require('../models/worker')
const { DBHelper } = require('../utils/db')

class WorkerHelper extends DBHelper {
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

module.exports = new WorkerHelper()
