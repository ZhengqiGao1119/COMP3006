const Model = require('../models/film')
const { DBHelper } = require('../utils/db')

class FilmHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  findSome(query) {
    if (query.type === 'all') {
      delete query.type
    }
    if (query.region === 'all') {
      delete query.region
    }
    if (query.release === '0') {
      query.releaseTime = {
        $gt: new Date()
      }
    } else if (query.release === '1') {
      query.releaseTime = {
        $lte: new Date()
      }
    }
    if (query.name) {
      query.name = {
        $regex: new RegExp(query.name, 'i')
      }
    } else {
      delete query.name
    }
    console.log(query, 'query.release');
    return super.findSome(query)
  }
}

module.exports = new FilmHelper()
