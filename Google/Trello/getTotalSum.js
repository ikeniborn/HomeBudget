function getTotalSum(postObject, source, type) {
  /*
   * @source - истоник: buffer, account
   * @type - тип данных: fact, budget, target
   */
  try {
    var currData = getCurrData(getAllData(postObject, source, type), postObject.ymd)
    var total = {}
    //* сумма по счету
    total.bill = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье
    total.account = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре
    total.nomenclature = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье приход
    total.income = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Приход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье расход
    total.expense = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Расход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* данные из учета
    total.row = currData.filter(function (array) {
      return array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature
    })
    total.rows = currData.filter(function (array) {
      return array.cfo == postObject.cfo
    })
    return total
  } catch (e) {
    console.error('getTotalSum: ' + e)
  }
}