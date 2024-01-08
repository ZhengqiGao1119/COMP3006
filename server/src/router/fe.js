const router = require('koa-router')()
const controller = require('../controllers/fe')

router.get('/', controller.find)
router.get('/page', controller.find)
router.get('/:id', controller.detail)
router.post('/', controller.save)
router.put('/:id', controller.update)
router.put('/', controller.update)
router.del('/:id', controller.delete)

module.exports = router
