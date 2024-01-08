const Model = require('../models/cart')
const { DBHelper } = require('../utils/db')
const ArrangementHelper = require('./arrangement')

class CartHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  async findSome(query) {
    const list = await super.findSome(query)
    const result = []
    for (let i = 0; i < list.docs.length; i++) {
      let t = list.docs[i]
      const arrangement = await ArrangementHelper.findById(t.aid)
      result[i] = {
        cart: t,
        arrangement: arrangement.arrangement,
        film: arrangement.film
      }
    }
    return result

  }
}

module.exports = new CartHelper()
