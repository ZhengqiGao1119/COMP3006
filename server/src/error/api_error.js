const ApiErrorMap = require('./api_error_map');

class ApiError extends Error {
  constructor(errorName, errorMsg) {
    super()
    let errorInfo = {}
    console.log(errorName, errorMsg);
    if (errorMsg) {
      errorInfo = {
        status: errorName,
        message: errorMsg
      }
    } else {
      errorInfo = ApiErrorMap.get(errorName)
    }
    this.name = errorName
    this.status = errorInfo.status
    this.message = errorInfo.message
  }
}

module.exports = ApiError
