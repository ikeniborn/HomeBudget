function getTotalSum(sheetID, sheetName, уmd, cfo, bill, account, nomenclature) {
  /*
    sheetID - идентификатор страницы гугл
    sheetName - наименование листа страницы
    уmd - период в формате yyyymmdd
    cfo - наименование цфо
    bill - наименование счета
    account - наименование стать
    nomenclature - наименование номенклатуры
   */
  var allDataFact = filterDataFromArray(getAllData(sheetID, sheetName), уmd)
  var total = {}

  total.bill = allDataFact.reduce(function (sum, array) {
    if (array.cfo == cfo && array.bill == bill) {
      sum += array.sum
    }
    return sum
  }, 0)

  total.account = allDataFact.reduce(function (sum, array) {
    if (array.cfo == cfo && array.bill == bill && array.account == account) {
      sum += array.sum
    }
    return sum
  }, 0)

  total.nomenclature = allDataFact.reduce(function (sum, array) {
    if (array.cfo == cfo && array.bill == bill && array.account == account && array.nomenclature == nomenclature) {
      sum += array.sum
    }
    return sum
  }, 0)

  return total
}