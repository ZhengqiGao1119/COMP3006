const Model = require('../models/arrangement')
const { DBHelper } = require('../utils/db')
const FilmHelper = require('./film')

class ArrangementHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  async findById(id) {
    const data = await super.findById(id)
    console.log(data, 'data');
    const film = data && await FilmHelper.findById(data.fid) || {}
    console.log(film, 'film');
    const res = {
      arrangement: data || {},
      film: film
    }
    return res
  }
  findSome(query) {
    if (query.name) {
      query.name = {
        $regex: new RegExp(query.name, 'i')
      }
    } else {
      delete query.name
    }
    return super.findSome(query)
  }
}

module.exports = new ArrangementHelper()
