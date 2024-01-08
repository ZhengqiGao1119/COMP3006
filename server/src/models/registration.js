const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  aid: {
    ref: 'activity',
    type: mongoose.Types.ObjectId
  },
  uid: {
    ref: 'user',
    type: mongoose.Types.ObjectId
  },
  
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('registration', schema)
