exports.has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key)
}