const Koa = require('koa')
const path = require('path')
const cors = require('koa-cors')
const json = require('koa-json')
const logger = require('koa-logger')
const onerror = require('koa-onerror')
const static = require('koa-static')
const responseFormatter = require('./middlewares/response_formatter')
const router = require('./router/index')
const { koaBody } = require('koa-body')
const { apiPrefix } = require('./config/index')
const jwtUtil = require('./utils/jwtUtil')
const app = new Koa()

require('./dbhelper/db')
onerror(app)
app.use(static(path.join(__dirname, '../static')))
app.use(koaBody({
  multipart: true,
  formidable: {
      uploadDir: path.join(__dirname, '../static/images'),
      keepExtensions: true,
      onFileBegin: (name, file) => {
        console.log('name:', name);
        console.log(file);
      }
  }
}))

app.use(json())
app.use(logger())
app.use(cors())
app.use(responseFormatter(apiPrefix))
app.use(jwtUtil.validateToken)
app.use(router.routes()).use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
})
app.listen(3002, () => {
  console.log('server address: localhost:3002');
})

