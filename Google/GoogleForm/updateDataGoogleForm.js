function updateDataGoogleForm(array, lastRow, ss) {
  for (var i = 0; i < array.length; i++) {
    var row = array[i]
    var rowDate = row.date
    if (row.period == 'Факт') {
      var rowPeriod = getParametr('factPeriod').value
    } else if (row.period == 'Факт-1') {
      var rowPeriod = getParametr('factPeriod-1').value
    } else if (row.period == 'Бюджет') {
      var rowPeriod = getParametr('budgetPeriod').value
    } else if (row.period == 'Бюджет+1') {
      var rowPeriod = getParametr('budgetPeriod+1').value
    } else if (isValidDate(row.period)) {
      var rowPeriod = row.period
    }
    var rowCfo = row.cfo
    var rowNomeclature = row.nomenclature
    var rowMvz = row.mvz
    if (rowMvz.length == 0) {
      var rowMvzname = row.cfo
    } else {
      var rowMvzname = costСenter.filter(function (array) {
        return array.alias == rowMvz || array.name == rowMvz
      })[0].name
    }
    var rowBill = accountingItem.filter(function (row) {
      return row.nomenclature == rowNomeclature
    })[0].bill
    var rowAccount = accountingItem.filter(function (row) {
      return row.nomenclature == rowNomeclature
    })[0].account
    var rowSum = row.sum
    var rowComment = row.comment
    ss.getRange(row.indexRow, 2).setValue(rowPeriod)
    ss.getRange(row.indexRow, 4).setValue(rowMvzname)
    ss.getRange(row.indexRow, 5).setValue(rowBill)
    ss.getRange(row.indexRow, 6).setValue(rowAccount)
  }
  return array.length > 0 ? true : false
}