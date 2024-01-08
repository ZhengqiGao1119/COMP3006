const fs = require('fs/promises')
exports.exitsFolder = async (path) => {
  try {
    await fs.stat(path)
  } catch {
    await fs.mkdir(path)
  }
};
