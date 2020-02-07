// получаение справочника статей
function getAccountingItem(nomenclature) {
  var ss = SpreadsheetApp.openById(sourceSheetID).getSheetByName(accountingItemSheetName)
  var ssArrays = ss.getDataRange().getValues()
  var accountArray = []
  var accountItem = {}
  ssArrays.reduce(function (row, array) {
    if (array[4] == nomenclature) {
      row = {}
      row.id = array[0]
      row.cashFlow = array[1]
      row.bill = array[2]
      row.account = array[3]
      row.nomenclature = array[4]
      row.form = array[5]
      row.budget = array[6]
      row.fact = array[7]
      row.target = array[8]
      accountArray.push(row)
    } else if (nomenclature == undefined) {
      row = {}
      row.id = array[0]
      row.cashFlow = array[1]
      row.bill = array[2]
      row.account = array[3]
      row.nomenclature = array[4]
      row.form = array[5]
      row.budget = array[6]
      row.fact = array[7]
      row.target = array[8]
      accountArray.push(row)
    }
  }, {})
  if (accountArray.length == 1) {
    accountItem = accountArray[0]
    return accountItem
  } else {
    return accountArray
  }
}