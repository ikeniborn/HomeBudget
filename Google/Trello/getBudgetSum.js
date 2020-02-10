function getBudgetSum(globalVar, postObject) {
  var budgetSum = getTotalSum(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
  var totalSum = {}
  var budgetRow = budgetSum.row
  totalSum.text = '**Итого бюджет** ' + formatterDate(postObject.period) + ':' + globalVar.lineBreak
  totalSum.text += postObject.cfo + ': ' + budgetSum.bill + ' р.' + globalVar.lineBreak
  totalSum.text += postObject.account + ': ' + budgetSum.account + ' р.' + globalVar.lineBreak
  totalSum.text += postObject.nomenclature + ': ' + budgetSum.nomenclature + ' р.' + globalVar.lineBreak
  totalSum.text += '**Внесенные суммы**:' + globalVar.lineBreak
  var i = 1
  budgetRow.forEach(function (row) {
    var comma
    budgetRow.length > i ? comma = ', ' : comma = ''
    totalSum.text += formatterDateTime(row.actionDate) + ': ' + row.sum + ' р. ' + row.comment + comma
    i += 1
  })
  return totalSum
}