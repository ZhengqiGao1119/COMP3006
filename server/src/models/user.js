const mongoose = require('mongoose')
const dbUtil = require('../utils/db.js')

const schema = new mongoose.Schema({
  nickname: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: [true, 'password required']
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'username required']
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    default: ''
  },
  birthday: {
    type: Date,
    default: ''
  },
  gender: {
    type: String,
    default: 'male'
  },
  avatar: {
    type: String,
    default: ''
  },
  info: {
    type: String,
    default: ''
  },
  roleId: {
    type: mongoose.Types.ObjectId,
    ref: 'role'
  },
  role: String,
  last_login: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updatedTime' },
  toJSON: { transform: dbUtil.transform, virtuals: true },
  toObject: { transform: dbUtil.transform, virtuals: true }
})
schema.static('paginate', dbUtil.paginate)

module.exports = mongoose.model('user', schema)

