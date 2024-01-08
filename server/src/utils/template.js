const fs = require('fs')
const { proxyHanlder } = require('./common')
const nunjucks = require('nunjucks')

class TemplateEngine {
  constructor() {
    this.nunjucks_env = nunjucks.configure({
      tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: "{{",
        variableEnd: '}}'
      }
    })
  }
  render(path, data) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(path)) {
        Promise.all(path.map((p) => this.render(p, data))).then(resolve, reject)
      } else {
        this.nunjucks_env.render(path, data, (err, res) => {
          if (err) {
            reject(err)
            return
          }
          resolve(res)
        })
      }
    })
  }
}

module.exports = proxyHanlder(new TemplateEngine())
