function getTotalSum(sheetId, sheetName, postObject) {
  var currData = getCurrData(getAllData(sheetId, sheetName), postObject.ymd)
  var total = {}

  total.bill = currData.reduce(function (sum, array) {
    if (array.cfo == postObject.cfo && array.bill == postObject.bill) {
      sum += array.sum
    }
    return sum
  }, 0)

  total.account = currData.reduce(function (sum, array) {
    if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account) {
      sum += array.sum
    }
    return sum
  }, 0)

  total.nomenclature = currData.reduce(function (sum, array) {
    if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature) {
      sum += array.sum
    }
    return sum
  }, 0)

  total.income = currData.reduce(function (sum, array) {
    if (array.cfo == postObject.cfo && array.bill == 'Приход') {
      sum += array.sum
    }
    return sum
  }, 0)

  total.expense = currData.reduce(function (sum, array) {
    if (array.cfo == postObject.cfo && array.bill == 'Расход') {
      sum += array.sum
    }
    return sum
  }, 0)

  total.row = currData.filter(function (array) {
    return array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature
  })

  return total
}