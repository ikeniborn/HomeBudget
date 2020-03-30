function copyObject(object) {
  if (Object.prototype.toString.call(object) == '[object Object]') {
    var allObject = Object.keys(object)
    var copyObject = {}
    allObject.forEach(function (obj) {
      const item = object[obj]
      if (Object.prototype.toString.call(item) == '[object Date]') {
        copyObject[obj] = new Date(JSON.parse(JSON.stringify(item)))
      } else {
        copyObject[obj] = JSON.parse(JSON.stringify(item))
      }
    })
    return copyObject
  } else {
    return {}
  }
}