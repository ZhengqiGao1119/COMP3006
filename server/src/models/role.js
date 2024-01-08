const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  name: String,
  note: String,
}, {
  versionKey: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('role', schema)

