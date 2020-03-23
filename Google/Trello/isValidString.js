function isValidString(d) {
  try {
    if (Object.prototype.toString.call(d) !== '[object String]')
      return false
    return d
  } catch (e) {
    console.error('isValidString: ' + e)
  }
}