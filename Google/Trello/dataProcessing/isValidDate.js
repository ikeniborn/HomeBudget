function isValidDate(d) {
  try {
    if (Object.prototype.toString.call(d) !== '[object Date]')
      return false;
    return !isNaN(d.getTime())
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}