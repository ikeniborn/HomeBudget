function getRestSum(postObject) {
  var budgetSum = getTotalSum(targetSheetID, targetSheetNameBudget, postObject)
  var factSum = getTotalSum(targetSheetID, targetSheetNameFact, postObject)
  var restSum = {}
  restSum.bill = budgetSum.bill - factSum.bill
  restSum.account = budgetSum.account - factSum.account
  restSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
  restSum.text = 'Остаток бюджета на ' + formatterDateTime(postObject.actionDate) + ': '
  restSum.text += postObject.listName + ': ' + restSum.bill + ' р., '
  restSum.text += postObject.account + ': ' + restSum.account + ' р., '
  restSum.text += postObject.nomenclature + ': ' + restSum.nomenclature + ' р. '
  return restSum
}