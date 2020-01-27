function getTotalSum(SheetID, SheetName, уmd, cfo, bill, account, nomenclature) {
  var ssData = SpreadsheetApp.openById(SheetID).SheetName(SheetName)
  var allDataFact = ssData.getDataRange().getValues();
  var total = {}
  var totalBill = 0
  var totalAccount = 0
  var totalNomenclature = 0
  // получение суммы по счету
  var filterDataBill = allDataFact.reduce(function (row, array) {
    var ymdRow = getYMD(array[1]).ymd
    if (ymdRow == уmd && array[2] == cfo && array[4] == bill) {
      totalBill += array[7]
      row.push(array)
    }
    return row
  }, [])
  // получение суммы по статье
  var filterDataAccount = filterDataBill.reduce(function (row, array) {
    if (array[5] == account) {
      totalAccount += array[7]
      row.push(array)
    }
    return row
  }, [])
  // получение суммы по номеклатуре
  var filterDataNomenclature = filterDataAccount.reduce(function (row, array) {
    if (array[6] == nomenclature) {
      totalNomenclature += array[7]
      row.push(array)
    }
    return row
  }, [])
  total.bill = totalBill
  total.account = totalAccount
  total.nomenclature = totalNomenclature
  return total
}