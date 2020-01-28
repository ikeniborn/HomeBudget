function getTotalSum(SheetID, SheetName, уmd, cfo, bill, account, nomenclature) {
  /*
    SheetID - идентификатор страницы гугл
    SheetName - наименование листа страницы
    уmd - период в формате yyyymmdd
    cfo - наименование цфо
    bill - наименование счета
    account - наименование стать
    nomenclature - наименование номенклатуры
   */
  // перепесать редьюс через вложенную функцию
  var ssData = SpreadsheetApp.openById(SheetID).getSheetByName(SheetName)
  var allDataFact = ssData.getDataRange().getValues()
  var total = {}
  var totalBill = 0
  var totalAccount = 0
  var totalNomenclature = 0
  // получение суммы по счету
  allDataFact.reduce(function (row, array) {
    var ymdRow = getYMD(array[1]).ymd
    if (ymdRow == уmd && array[2] == cfo && array[4] == bill) {
      totalBill += array[7]
      if (array[5] == account) {
        totalAccount += array[7]
        if (array[6] == nomenclature) {
          totalNomenclature += array[7]
        }
      }
      row.push(array)
    }
    return row
  }, [])
  total.bill = totalBill
  total.account = totalAccount
  total.nomenclature = totalNomenclature
  return total
}