function getTotalSum(postObject, sheetId, sheetName) {
  try {
    var currData = getCurrData(getAllData(postObject, sheetId, sheetName), postObject.ymd)
    var total = {}
    //* сумма по счету
    total.bill = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.listName && array.bill == postObject.bill) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье
    total.account = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.listName && array.bill == postObject.bill && array.account == postObject.account) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре
    total.nomenclature = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.listName && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье приход
    total.income = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.listName && array.bill == 'Приход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье расход
    total.expense = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.listName && array.bill == 'Расход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* данные из учета
    total.row = currData.filter(function (array) {
      return array.cfo == postObject.listName && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature
    })
    return total
  } catch (e) {
    console.error('getTotalSum: ' + e)
  }
}