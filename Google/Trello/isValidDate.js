function isValidDate(d) {
  try {
    if (Object.prototype.toString.call(d) !== '[object Date]')
      return false;
    return !isNaN(d.getTime())
  } catch (e) {
    console.error('isValidDate: ' + e)
  }
}