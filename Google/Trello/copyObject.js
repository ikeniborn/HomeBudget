function copyObject(object) {
  if (Object.prototype.toString.call(object) == '[object Object]') {
    return JSON.parse(JSON.stringify(object))
  } else {
    return {}
  }
}