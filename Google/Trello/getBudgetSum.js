function getBudgetSum(postObject) {
  var budgetSum = getTotalSum(targetSheetID, targetSheetNameBudget, postObject)
  var totalSum = {}
  totalSum.text = 'Итого: '
  totalSum.text += 'ЦФО: ' + budgetSum.bill + ' р., '
  totalSum.text += 'Статья: ' + budgetSum.account + ' р., '
  totalSum.text += 'Номенклатура: ' + budgetSum.nomenclature + ' р. '
  return totalSum
}