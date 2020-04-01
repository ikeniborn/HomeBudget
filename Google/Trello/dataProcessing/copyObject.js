function copyObject(object) {
  if (Object.prototype.toString.call(object) == '[object Object]') {
    return Object.assign({}, object)
  } else {
    return {}
  }
}