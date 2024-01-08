const Model = require('../models/order')
const { DBHelper } = require('../utils/db')
const ArrangementHelper = require('./arrangement')
const UserHelper = require('./user')

class OrderHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  async findSome(query) {
    const data = await super.findSome(query)
    const result = []
    for (let i = 0; i < data.docs.length; i++) {
      let t = data.docs[i]
      const arrangement = await ArrangementHelper.findById(t.aid)
      console.log(arrangement, 'arrangement');
      const user = await UserHelper.findById(t.uid)
      result.push({
        order: t,
        arrangement: arrangement.arrangement,
        film: arrangement.film,
        user: user
      })
    }
    data.docs = result
    return data
  }

  async save(data) {
    console.log(data, 'dddd');
    const a = await ArrangementHelper.findById(data.aid)
    console.log(a, 'a');
    await ArrangementHelper.update({_id: a.arrangement._id}, {boxOffice: (parseFloat(a.arrangement.boxOffice) || 0) + parseFloat(data.price)})
    return await super.save(data)
  }
}

module.exports = new OrderHelper()
