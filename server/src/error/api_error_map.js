const ApiErrorNames = require('./api_error_name')

const ApiErrorMap = new Map()

ApiErrorMap.set(ApiErrorNames.NOT_FOUND, { code: ApiErrorNames.NOT_FOUND, message: 'not found' })
ApiErrorMap.set(ApiErrorNames.UNKNOW_ERROR, { code: ApiErrorNames.UNKNOW_ERROR, message: 'unknown error' })
ApiErrorMap.set(ApiErrorNames.LEGAL_ID, { code: ApiErrorNames.LEGAL_ID, message: 'id illegality' })
ApiErrorMap.set(ApiErrorNames.UNEXIST_ID, { code: ApiErrorNames.UNEXIST_ID, message: 'id non-existent' })
ApiErrorMap.set(ApiErrorNames.LEGAL_FILE_TYPE, { code: ApiErrorNames.LEGAL_FILE_TYPE, message: 'File type not allowed' })
ApiErrorMap.set(ApiErrorNames.NO_AUTH, { code: ApiErrorNames.NO_AUTH, message: 'No operation permission' })
ApiErrorMap.set(ApiErrorNames.NO_AUTHORIZATION, { code: ApiErrorNames.NO_AUTHORIZATION, message: 'Not Logged In' })
ApiErrorMap.set(ApiErrorNames.AUTHORIZATION_EXPRIED, { code: ApiErrorNames.AUTHORIZATION_EXPRIED, message: 'login timeout' })

module.exports = ApiErrorMap
