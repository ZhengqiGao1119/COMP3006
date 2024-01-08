const path = require('path')

const rootPath = path.resolve(__dirname, './generateCodeTemplate')

module.exports = {
  port: process.env.PORT || 3000,
  saltRound: 12,
  apiPrefix: "/api",
  database: "mongodb://127.0.0.1:27017/web",
  databasePro: "mongoose:??root:123456@110",
  jwt: {
    secret: "tookingHome",
    expriseIn: "2 days",
    excludePath: [
      /^\/api\/user\/login/,
      /^\/api\/worker\/login/,
      /^\/api\/user\/register/,
      /^\/api\/articleCategory/,
      /^\/api\/article/,
      /^(?!\/api)/,
      /^\/api\/common(.*?)/,
    ],
  },
  generateCode: {
    rootPath,
    files: {
      server: [
        {
          dirName: "controllers",
          path: path.resolve(rootPath, "./server/controllers/index.js"),
        },
        {
          dirName: "dbhelper",
          path: path.resolve(rootPath, "./server/dbhelper/index.js"),
        },
        {
          dirName: "models",
          path: path.resolve(rootPath, "./server/models/index.js"),
        },
        {
          dirName: "router",
          path: path.resolve(rootPath, "./server/router/index.js"),
        },
      ],
      client: [
        {
          dirName: "api",
          suffix: "ts",
          path: path.resolve(rootPath, "./client/api.js"),
        },
        {
          dirName: "view",
          suffix: "vue",
          path: path.resolve(rootPath, "./client/view.vue"),
        },
      ],
      permission: {
        suffix: "json",
        path: path.resolve(rootPath, "./permission.json"),
      },
    },
  },
};
