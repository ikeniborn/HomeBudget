function getRestSum(postObject) {
  var budgetSum = getTotalSum(targetSheetID, targetSheetNameBudget, postObject)
  var factSum = getTotalSum(targetSheetID, targetSheetNameFact, postObject)
  var restSum = {}
  restSum.bill = budgetSum.bill - factSum.bill
  restSum.account = budgetSum.account - factSum.account
  restSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
  restSum.rest = factSum.income - factSum.expense
  restSum.text = '*Дата обновления*: ' + formatterDateTime(postObject.actionDate) + lineBreak
  restSum.text += '**Остаток бюджета**:' + lineBreak
  restSum.text += postObject.cfo + ': ' + restSum.bill + ' р.,' + lineBreak
  restSum.text += postObject.account + ': ' + restSum.account + ' р.,' + lineBreak
  restSum.text += postObject.nomenclature + ': ' + restSum.nomenclature + ' р.' + lineBreak
  restSum.text += '**Остаток средств** ' + ': ' + restSum.rest + ' р.'
  return restSum
}