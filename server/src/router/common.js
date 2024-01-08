const fs = require('fs')
const path = require('path')
const router = require('koa-router')()

let bgFileNameList = []
const bgFileMap = new Map()

function getRandom(len) {
  return Math.floor(Math.random() * len)
}

router.get('/getBgUrl', (ctx, next) => {
  if (bgFileNameList.length < 1) {
    bgFileNameList = fs.readdirSync(path.resolve(__dirname, '../../static/wallpaper'))
  }
  let randomIndex = getRandom(bgFileNameList.length)
  if (bgFileMap.has(bgFileNameList[randomIndex])) {
    ctx.body = bgFileMap.get(bgFileNameList[randomIndex])
    next()
  } else {
    ctx.body = `http://localhost:3002/wallpaper/${bgFileNameList[randomIndex]}`
    next()
  }
})


router.post('/upload-file', async (ctx) => {
  const file = ctx.request.files.file
  console.log(file, 'file');
  console.log(file.path);
  const filePath = ctx.origin + '/images/' + path.basename(file.filepath)
  console.log(filePath, 'file');
  ctx.body = {
    originName: file.originalFilename,
    url: filePath
  }
})


module.exports = router
