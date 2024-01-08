const ApiError = require('../error/api_error')
const ApiErrorNames = require('../error/api_error_name')
const config = require('../config/index')
const jwt = require('jsonwebtoken')

class JwtUtil {
  secret
  expriseIn
  excludePath
  static instance
  constructor(options = {}) {
    const { secret, expriseIn, excludePath } = options
    this.secret = secret
    this.expriseIn = expriseIn
    this.excludePath = excludePath
  }
  validateToken(ctx, next) {
    return JwtUtil.instance.validate(ctx, next)
  }
  async validate(ctx, next) {
    const path = ctx.request.path
    const isExcludePath = this.excludePath.some(e => {
      return e.test(path)
    })
    if (isExcludePath) {
      return await next()
    }
    const token = (ctx.get('Authorization') || '').split(' ').pop()
    if (!token) {
      throw new ApiError(ApiErrorNames.NO_AUTHORIZATION)
    }
    try {
      const { id } = jwt.verify(token, this.secret)
      ctx.userId = id
      await next()
    } catch (err) {
      const { name } = err
      switch (name) {
        case 'TokenExpiredError':
          throw new ApiError(ApiErrorNames.AUTHORIZATION_EXPRIED)
        case 'JsonWebTokenError':
          throw new ApiError(ApiErrorNames.NO_AUTHORIZATION)
        default:
          throw err
      }
    }
  }
  auth(sign) {
    return jwt.sign(sign, this.secret, { expiresIn: this.expriseIn})
  }
  static getInstance() {
    if (!JwtUtil.instance || !(JwtUtil.instance instanceof JwtUtil)) {
      JwtUtil.instance = new JwtUtil(config.jwt)
    }
    return JwtUtil.instance
  }
}

const jwtUtil = Object.freeze(JwtUtil.getInstance())

module.exports = jwtUtil
