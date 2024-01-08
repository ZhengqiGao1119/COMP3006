const router = require('koa-router')()
const controller = require('../controllers/user')

router.get('/', controller.find)
router.get('/page', controller.find)
router.get('/like', controller.find)
router.get('/:id', controller.detail)
router.post('/register', controller.save)
router.post('/login', controller.login)
router.put('/:id', controller.update)
router.del('/:id', controller.delete)

module.exports = router
