const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  roleId: {
    type: mongoose.Types.ObjectId,
    ref: 'role'
  },
  menuId: {
    type: [mongoose.Types.ObjectId],
    ref: 'menu'
  },
}, {
  versionKey: false,
  toJSON: { transform: dbUtil.transform },
  toObject: { transform: dbUtil.transform }
})

module.exports = mongoose.model('roleMenu', schema)
