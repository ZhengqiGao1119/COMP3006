const mg = require('mongoose')

exports.transaction = async function transaction(fn) {
  const transactionSession = await mg.startSession()
  await transactionSession.startTransaction()
  let result
  try {
    result = await fn()
    await transactionSession.commitTransaction()
  } catch(e) {
    await transactionSession.abortTransaction()
    throw e
  } finally {
    await transactionSession.endSession()
  }
  return result
};

/**
 * @description
 * @param {*} doc 
 * @param {*} ret 
 */
exports.transform = function transform(doc, ret) {
  ret.id = ret._id
  delete ret._id
  return ret
}

/**
 * @description
 * @param {*} query 
 * @param {*} options 
 * @param {*} callback 
 * @returns 
 */
exports.paginate = function paginate(query, options, callback) {
  query = query || {}
  options = Object.assign({}, paginate.options, options)
  let { select, sort, populate, lean, leanWithId, pageSize, limit } = options;
  limit = pageSize
  let current, offset, skip, promises

  if (options.offset) offset = skip = options
  else if (options.current) {
    current = options.current
    skip = (current-1) * limit
  } else {
    current = 1
    offset = skip = 0
  }
  if (limit) {
    let docsQuery = this.find(query)
      .select(select)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(lean);
    if (populate) {
      [].concat(populate).forEach((t) => {
        docsQuery.populate(t);
      });
    }
    promises = {
      docs: docsQuery.exec(),
      count: this.count(query).exec(),
    };
    if (lean && leanWithId) {
      promises.docs = promises.docs.then((docs) => {
        docs.forEach((doc) => {
          doc.id = String(doc._id);
        });
        return docs;
      });
    }
  }

  promises = Object.keys(promises).map(x => promises[x])
  return Promise.all(promises).then(([docs, count]) => {
    let result = {
      docs: docs,
      total: count,
      pageSize: limit,
      current: current,
    };
    if (offset !== undefined) {
      result.offset = offset
    }
    if (typeof callback === 'function') {
      return callback(null, result)
    }
    return Promise.resolve(result)
  })
}


/**
 * @class DBHelper
 * @description
 */
exports.DBHelper = class DBHelper {
  /**
   * 
   * @param {Mongoose} Model
   */
  constructor(Model) {
    this.Model = Model
  }
  /**
   * @name findAll
   * @returns Promise
   */
  findAll(params) {
    return this.Model.find(params).exec()
  }
  async findOne(params = {}, opts = {}) {
    return this.Model.findOne(params).lean().exec()
  }
  /**
   * @name findSome
   * @returns Promise
   */
  async findSome(params, opts) {
    params = params || {}
    const options = {
      pageSize: params.pageSize || params.limit || 10,
      current: params.current || params.page || 1,
      ...opts,
    };
    for (let k in params) {
      if (params[k] === undefined || k === 'limit' || k === 'page') delete params[k]
    }
    const query = Object.assign({}, params)
    return this.Model.paginate(query, options)
  }
  /**
   * @name findById
   * @returns Promise
   */
  findById (id) {
    return this.Model.findById(id).exec()
  }
  /**
   * @name save
   * @returns Promise
   */
  save(data) {
    return this.Model.create(data)
  }
  /**
   * @name update
   * @returns Promise
   */
  update(query, data, opts) {
    return this.Model.findOneAndUpdate(query, data, opts).exec()
  }
  /**
   * @name delete
   * @returns Promise
   */
  delete(id) {
    return this.Model.findByIdAndDelete(id).exec()
  }
}
