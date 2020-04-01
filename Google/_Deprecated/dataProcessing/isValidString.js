function isValidString(d) {
  try {
    if (Object.prototype.toString.call(d) !== '[object String]')
      return false
    return d
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}