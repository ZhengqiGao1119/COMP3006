const ApiError = require('../error/api_error')
const ApiErrorNames = require('../error/api_error_name')

/**
 * @param {string} apiPrefix
 * @returns 
 */
const responseFormatter = (apiPrefix) => async (ctx, next) => {
  if (ctx.request.path.startsWith(apiPrefix)) {
    try {
      await next()
      ctx.body = {
        status: 'success',
        success: true,
        message: 'success',
        result: ctx.body,
        data: ctx.body
      }
    } catch(err) {
      if (err instanceof ApiError) {
        ctx.body = {
          status: err.status,
          message: err.message
        }
      } else {
        ctx.status = 400
        ctx.response.body = {
          status: err.name,
          message: err.message
        }
      }
    }
  } else {
    await next()
  }
}

module.exports = responseFormatter
