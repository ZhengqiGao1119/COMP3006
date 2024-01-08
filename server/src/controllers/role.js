const dbHelper = require('../dbhelper/role')
const ApiError = require('../error/api_error')
const ApiErrorNames = require('../error/api_error_name')

exports.find = async ctx => {
  let result
  let reqQuery = ctx.query
  if (Object.keys(reqQuery).length > 0) {
    if (reqQuery.id) {
      result = dbHelper.findById(reqQuery.id);
    } else {
      result = dbHelper.findSome(reqQuery);
    }
  } else {
    result = dbHelper.findAll();
  }
  await result.then(res => {
    if (res) {
      ctx.body = res
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID)
    }
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}

exports.detail = async ctx => {
  const { id } = ctx.params
  await dbHelper.findById(id).then(res => {
    if (res) {
      ctx.body = res
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID)
    }
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}

exports.save = async ctx => {
  const dataObj = ctx.request.body
  for (let k in dataObj) {
    if (!dataObj[k]) dataObj[k] = undefined
  }
  await dbHelper.save(dataObj).then(res => {
    ctx.body = res
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}

exports.update = async ctx => {
  const ctxParams = ctx.params
  const dataObj = { ...ctxParams, ...ctx.request.body }
  await dbHelper.update({_id: dataObj.id}, dataObj).then(res => {
    if (res) {
      ctx.body = res
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID)
    }
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}

exports.delete = async ctx => {
  const ctxParams = ctx.params
  const dataObj = { ...ctxParams, ...ctx.request.body }
  if (!dataObj.id) {
    throw new ApiError(ApiErrorNames.LEGAL_ID)
  }
  await dbHelper.delete(dataObj.id).then(res => {
    if (res) {
      ctx.body = {}
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID)
    }
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}
