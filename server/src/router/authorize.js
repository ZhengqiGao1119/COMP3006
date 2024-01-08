const router = require('koa-router')()
const controller = require('../controllers/authorize')

router.get('/', controller.find)
router.post('/', controller.save)
router.get('/onRole', controller.onRole)

module.exports = router
