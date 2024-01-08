const Model = require('../models/roleMenu')
const { DBHelper } = require('../utils/db')

class RoleMenuHelper extends DBHelper {
  constructor() {
    super(Model)
  }
  findOneWithMenu(params) {
    return this.Model.findOne(params).populate('menuId').lean().exec()
  }
}

module.exports = new RoleMenuHelper()
