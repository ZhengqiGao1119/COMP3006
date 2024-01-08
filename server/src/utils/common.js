let { transform } = require('./db.js')

exports.processTree = (model, doc, query, key, bearing, fn) => {
    if (!transform) {
        transform = require('./db').transform
    }
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = 0; i < doc.length; i++) {
                let item = doc[i]
                item._id && transform(null, item)
                let res = await model.find({[key]: item.id, ...query}).lean()
                item[bearing] = res
                fn && fn(item[bearing])
                if (res.length > 0) {
                    await this.processTree(model, res, query, key, bearing, fn)
                }
            }
            resolve(doc)
        } catch(e) {
            reject(e)
        }
    })
}

exports.proxyHanlder = (target) => {
    let m = new WeakMap()
    const handler = {
        get(target, key) {
            let val = Reflect.get(target, key)
            if (typeof val !== 'function') {
                return val
            }
            if (!m.has(val)) {
                m.set(val, val.bind(target))
            }
            return m.get(val)
        },
    }
    return new Proxy(target, handler)
}

