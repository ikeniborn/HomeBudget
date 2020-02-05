function getBudgetSum(postObject) {
  var budgetSum = getTotalSum(targetSheetID, targetSheetNameBudget, postObject)
  var totalSum = {}
  totalSum.text = 'Итого бюджет ' + formatterDate(postObject.period) + ': '
  totalSum.text += postObject.cfo + ': ' + budgetSum.bill + ' р., '
  totalSum.text += postObject.account + ': ' + budgetSum.account + ' р., '
  totalSum.text += postObject.nomenclature + ': ' + budgetSum.nomenclature + ' р. '
  return totalSum
}