const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  phone: String,
  entry: {
    type: Boolean,
    default: true
  },
  department: String,
  gender: String,
  avatar: String,
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('worker', schema)
