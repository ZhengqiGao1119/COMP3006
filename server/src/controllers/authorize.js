const dbHelper = require('../dbhelper/roleMenu')
const ApiError = require('../error/api_error')
const ApiErrorNames = require('../error/api_error_name')
const { has } = require('../utils/helper')

exports.find = async ctx => {
  await dbHelper.findOne(ctx.query).then(res => {
    if (res) {
      ctx.body = res
    } else {
      ctx.body = {}
    }
  }).catch(err => {
    throw new ApiError(err.name, err.message)
  })
}

exports.save = async ctx => {
  const { roleId, menuId } = ctx.request.body
  try {
    let data = await dbHelper.findOne({roleId})
    if (data) {
      await dbHelper.update({roleId: roleId}, {roleId, menuId}, { upsert: true })
    } else {
      await dbHelper.save({roleId, menuId})
    }
    ctx.body = 'operate success'
  } catch(err) {
    throw new ApiError(err.name, err.message)
  }
}

exports.onRole = async ctx => {
  try {
    const { roleId } = ctx.query
    let data = await dbHelper.findOneWithMenu({roleId})
    let result = {}
    if (data && has(data, 'menuId')) {
      data.menuId.forEach(menu => {
        if (has(menu, "permissionName")) {
          result[menu.permissionName] = true
        }
      })
    }
    ctx.body = result
  } catch(err) {
    throw new ApiError(err.name, err.message)
  }
}
