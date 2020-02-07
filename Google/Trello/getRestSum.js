/* eslint-disable no-undef */
function getRestSum(postObject) {
  var globalVar = getVariable()
  var budgetSum = getTotalSum(globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
  var factSum = getTotalSum(globalVar.targetSheetID, globalVar.targetSheetNameFact, postObject)
  var restSum = {}
  restSum.bill = budgetSum.bill - factSum.bill
  restSum.account = budgetSum.account - factSum.account
  restSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
  restSum.rest = factSum.income - factSum.expense
  restSum.text = '*Дата обновления*: ' + formatterDateTime(postObject.actionDate) + globalVar.lineBreak
  restSum.text += '**Остаток бюджета**:' + globalVar.lineBreak
  restSum.text += postObject.cfo + ': ' + restSum.bill + ' р.,' + globalVar.lineBreak
  restSum.text += postObject.account + ': ' + restSum.account + ' р.,' + globalVar.lineBreak
  restSum.text += postObject.nomenclature + ': ' + restSum.nomenclature + ' р.' + globalVar.lineBreak
  restSum.text += '**Остаток средств** ' + ': ' + restSum.rest + ' р.'
  return restSum
}