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
  seats: String,
  price: Number,
  status: Number,
  payTime: Date,
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('order', schema)
