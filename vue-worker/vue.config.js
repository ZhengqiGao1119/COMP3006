const path = require("path");
function resolve(dir) {
  return path.join(__dirname, "./", dir);
}
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8082,
    open: true
  },
  chainWebpack(config) {
    config.module.rule("svg").exclude.add(resolve("src/assets/icons/svg")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/icons/svg"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
}
