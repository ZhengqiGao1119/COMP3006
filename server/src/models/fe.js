const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  fid: {
    ref: 'film',
    type: mongoose.Types.ObjectId
  },
  uid: {
    ref: 'user',
    type: mongoose.Types.ObjectId
  },
  star: Number,
  comment: String,
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('fe', schema)
