function getRestSum(postObject) {
  var budgetSum = getTotalSum(targetSheetID, targetSheetNameBudget, postObject)
  var factSum = getTotalSum(targetSheetID, targetSheetNameFact, postObject)
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