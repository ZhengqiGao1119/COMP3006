const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  name: String,
  region: String,
  releaseTime: Date,
  showType: String,
  status: Boolean,
  duration: Number,
  introduction: String,
  cover: String,
  type: String, 
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updatedTime' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('film', schema)
