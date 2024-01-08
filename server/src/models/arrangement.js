const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  fid: {
    ref: 'film',
    type: mongoose.Types.ObjectId
  },
  name: String,
  seatNumber: Number,
  boxOffice: String,
  price: Number,
  type: String,
  date: Date,
  startTime: String,
  endTime: String,
}, {
  versionKey: false,
  timestamps: { createdAt: 'createdTime', updatedAt: 'updatedTime' },
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('arrangement', schema)
