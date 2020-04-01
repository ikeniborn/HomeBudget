function getCurrData(postObject, type) {
  /*
   * @type - истоник: Бюджет, Факт
   */
  try {
    return postObject.dataAccount.filter(function (row) {
      return row.ymd == postObject.ymd && row.type == type
    })
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}