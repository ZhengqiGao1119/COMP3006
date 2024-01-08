const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  uid: {
    ref: 'user',
    type: mongoose.Types.ObjectId
  },
  aid: {
    ref: 'arrangement',
    type: mongoose.Types.ObjectId
  },
  phone: String,
  status: Number,
  seats: String,
  price: Number,
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('cart', schema)
