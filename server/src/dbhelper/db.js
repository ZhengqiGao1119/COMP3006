const mongoose = require('mongoose')
const config = require('../config')

const IS_PROD = ['production', 'prod', 'pro'].includes(process.env.NODE_ENV)
const databaseUrl = IS_PROD ? config.databasePro : config.database

mongoose.connect(databaseUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  config: {
    autoIndex: false
  }
})

mongoose.connection.on('connected', () => {
  console.log('Mongoose connect success：', databaseUrl);
})

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connect error', err);
})

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connect close');
})

module.exports = mongoose
