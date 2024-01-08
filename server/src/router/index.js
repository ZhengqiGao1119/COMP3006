const fs = require('fs')
const router = require('koa-router')()
const { apiPrefix } = require('../config/index')
router.prefix(apiPrefix)

fs.readdirSync(__dirname).forEach(filename => {
  if (!/\.js$/.test(filename) || filename === 'index.js') return
  const route = require(`./${filename}`)
  router.use(`/${filename.replace('.js', '')}`, route.routes(), route.allowedMethods())
})
module.exports = router
