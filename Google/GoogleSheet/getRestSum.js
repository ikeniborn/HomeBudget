function getRestSum(postObject) {
  var listName = postObject.listName
  var nomenclatureName = postObject.nomenclature
  var billName = postObject.bill
  var accountName = postObject.account
  var budgetSum = getTotalSum(targetSheetID, targetSheetNameBudget, listName, billName, accountName, nomenclatureName)
  var factSum = getTotalSum(targetSheetID, targetSheetNameFact, listName, billName, accountName, nomenclatureName)
  var restSum = {}
  restSum.bill = budgetSum.bill - factSum.bill
  restSum.account = budgetSum.account - factSum.account
  restSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
  restSum.text = 'Остаток: '
  restSum.text += 'ЦФО: ' + restSum.bill + ' р., '
  restSum.text += 'Статья: ' + restSum.account + ' р., '
  restSum.text += 'Номенклатура: ' + restSum.nomenclature + ' р. '
  return restSum
}