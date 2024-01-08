const UserHelper = require('../dbhelper/user')
const ApiError = require('../error/api_error')
const ApiErrorNames = require('../error/api_error_name')
const BcryptUtil = require('../utils/bcryptUtil')
const jwtUtil = require('../utils/jwtUtil')
const { has } = require('../utils/helper')

exports.find = async ctx => {
  let result
  let reqQuery = ctx.query
  if (Object.keys(reqQuery).length > 0) {
    if (reqQuery.id) {
      result = UserHelper.findById(reqQuery.id);
    } else {
      result = UserHelper.findSome(reqQuery);
    }
  } else {
    result = UserHelper.findAll();
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
  await UserHelper.findById(id).then(res => {
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
  if (!dataObj.password || !dataObj.username) throw new ApiError('error', 'Account password not filled in') 
  for (let k in dataObj) {
    if (!dataObj[k]) dataObj[k] = undefined
  }
  let findData = await UserHelper.findOne({username: dataObj.username})
  if (findData) {
    throw new ApiError('error', 'The account already exists')
  } else {
    dataObj.password = BcryptUtil.genPassword(dataObj.password)
    dataObj.roleId = '6459ae239dab2807dfec30fd'
    await UserHelper.save(dataObj).then(res => {
      ctx.body = 'operate success'
    }).catch(err => {
      throw new ApiError(err.name, err.message)
    })
  }
}

exports.login = async ctx => {
  const dataObj = ctx.request.body
  if (!dataObj.password || (!dataObj.username && !dataObj.account)) throw new ApiError('error', 'Account password not filled in')
  const params = {username: dataObj.username || dataObj.account}
  if (dataObj.role) {
    params.role = dataObj.role
  }
  let data = await UserHelper.findOne(params)
  if (!data) throw new ApiError('error', 'Account password error')
  if (BcryptUtil.comparePassword(dataObj.password, data.password)) {
    delete data.password
    let token = jwtUtil.auth({id: data.id, roleId: data.roleId})
    ctx.body = {
      ...data,
      token
    }
  } else {
    throw new ApiError('error', 'Account password error')
  }
}

exports.update = async ctx => {
  const dataObj = ctx.request.body
  if (!has(dataObj, 'id')) {
    throw new ApiError('error', "id non-existent")
  }
  try {
    // Handle user information updates
    let res = await UserHelper.update({_id: dataObj.id}, dataObj)
    if (res) {
      ctx.body = res
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID)
    }
  } catch(err) {
    throw new ApiError(err.name, err.message)
  }
}

exports.delete = async ctx => {
  const ctxParams = ctx.params
  const dataObj = { ...ctxParams, ...ctx.request.body}
  if (!dataObj.id) {
    throw new ApiError(ApiErrorNames.LEGAL_ID)
  }
  await UserHelper.delete(dataObj.id).then(res => {
    if (res) {
      ctx.body = {}
    } else {
      throw new ApiError(ApiErrorNames.UNEXIST_ID)
    }
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}
