function getTotalSum(sheetId, sheetName, postObject) {
  var listName = postObject.listName
  var nomenclatureName = postObject.nomenclature
  var billName = postObject.bill
  var accountName = postObject.account
  var currData = getCurrData(getAllData(sheetId, sheetName), postObject.ymd)
  var total = {}

  total.bill = currData.reduce(function (sum, array) {
    if (array.cfo == listName && array.bill == billName) {
      sum += array.sum
    }
    return sum
  }, 0)

  total.account = currData.reduce(function (sum, array) {
    if (array.cfo == listName && array.bill == billName && array.account == accountName) {
      sum += array.sum
    }
    return sum
  }, 0)

  total.nomenclature = currData.reduce(function (sum, array) {
    if (array.cfo == listName && array.bill == billName && array.account == accountName && array.nomenclature == nomenclatureName) {
      sum += array.sum
    }
    return sum
  }, 0)

  return total
}