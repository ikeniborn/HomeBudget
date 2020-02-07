function getBudgetSum(postObject) {
  var globalVar = getVariable()
  var budgetSum = getTotalSum(globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
  var totalSum = {}
  var budgetRow = budgetSum.row
  totalSum.text = '**Итого бюджет** ' + formatterDate(postObject.period) + ':' + lineBreak
  totalSum.text += postObject.cfo + ': ' + budgetSum.bill + ' р.' + lineBreak
  totalSum.text += postObject.account + ': ' + budgetSum.account + ' р.' + lineBreak
  totalSum.text += postObject.nomenclature + ': ' + budgetSum.nomenclature + ' р.' + lineBreak
  totalSum.text += '**Внесенные суммы**:' + lineBreak
  var i = 1
  budgetRow.forEach(function (row) {
    var comma
    budgetRow.length > i ? comma = ', ' : comma = ''
    totalSum.text += formatterDateTime(row.actionDate) + ': ' + row.sum + ' р. ' + row.comment + comma
    i += 1
  })
  return totalSum
}