const dbHelper = require('../dbhelper/worker')
const ApiError = require('../error/api_error')
const ApiErrorNames = require('../error/api_error_name')
const BcryptUtil = require('../utils/bcryptUtil')
const jwtUtil = require('../utils/jwtUtil')

exports.find = async ctx => {
  let result
  let reqQuery = ctx.query
  if (Object.keys(reqQuery).length) {
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

exports.login = async ctx => {
  const dataObj = ctx.request.body
  if (!dataObj.password || (!dataObj.username && !dataObj.account)) throw new ApiError('error', 'Account password not filled in')
  const params = {username: dataObj.username || dataObj.account}
  let data = await dbHelper.findOne(params)
  if (!data) throw new ApiError('error', 'Account password error')
  if (BcryptUtil.comparePassword(dataObj.password, data.password)) {
    delete data.password
    let token = jwtUtil.auth({id: data._id, role: data.role})
    ctx.body = {
      ...data,
      token
    }
  } else {
    throw new ApiError('error', 'Account password error')
  }
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
  if (!dataObj.password || !dataObj.username) throw new ApiError('error', 'Account password not filled in') 
  dataObj.password = BcryptUtil.genPassword(dataObj.password)
  await dbHelper.save(dataObj).then(res => {
    ctx.body = res
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}

exports.update = async ctx => {
  const ctxParams = ctx.params
  const dataObj = { ...ctxParams, ...ctx.request.body }
  if (dataObj.password) {
    dataObj.password = BcryptUtil.genPassword(dataObj.password)
  }
  delete dataObj.createTime
  delete dataObj.updateTime
  console.log(dataObj, 'dataObj');
  await dbHelper.update({id: dataObj.id}, dataObj).then(res => {
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
  const dataObj = { ...ctxParams, ...ctx.request.body}
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
