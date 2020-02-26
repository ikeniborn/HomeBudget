/* eslint-disable no-undef */
function getSum(globalVar, postObject) {
  try {
    var budgetSum = getTotalSum(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameBudget, postObject)
    var factSum = getTotalSum(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameFact, postObject)
    var totalSum = {}
    totalSum.bill = budgetSum.bill - factSum.bill
    totalSum.account = budgetSum.account - factSum.account
    totalSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
    totalSum.total = factSum.income - factSum.expense
    totalSum.text = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + globalVar.lineBreak
    if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      //* описание для фактических карточек
      totalSum.text += '**Остаток бюджета**:' + globalVar.lineBreak
      totalSum.text += postObject.cfo + ': ' + restSum.bill + ' р.,' + globalVar.lineBreak
      totalSum.text += postObject.account + ': ' + restSum.account + ' р.,' + globalVar.lineBreak
      totalSum.text += postObject.nomenclature + ': ' + restSum.nomenclature + ' р.' + globalVar.lineBreak
      totalSum.text += '**Остаток средств** ' + ': ' + restSum.total + ' р.'
    } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      //* описание для бюджетных карточек
      var budgetRow = budgetSum.row
      totalSum.text = '**Итого бюджет** ' + formatterDate(postObject.period).date + ':' + globalVar.lineBreak
      totalSum.text += postObject.cfo + ': ' + budgetSum.bill + ' р.' + globalVar.lineBreak
      totalSum.text += postObject.account + ': ' + budgetSum.account + ' р.' + globalVar.lineBreak
      totalSum.text += postObject.nomenclature + ': ' + budgetSum.nomenclature + ' р.' + globalVar.lineBreak
      if ([globalVar.boardIdBudget].indexOf(postObject.boardId) !== -1) {
        //* информация по рестроспективе за последние два месяца
        var postObjectPrev1 = postObject
        postObjectPrev1.period = new Date(postObject.period.getYear(), postObject.period.getMonth() - 1, 1)
        postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
        var postObjectPrev2 = postObject
        var factSumPrev1 = getTotalSum(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameFact, postObjectPrev1)
        postObjectPrev2.period = new Date(postObject.period.getYear(), postObject.period.getMonth() - 2, 1)
        postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
        var factSumPrev2 = getTotalSum(globalVar, globalVar.targetSheetID, globalVar.targetSheetNameFact, postObjectPrev2)
        totalSum.text += '**Факт прошлых периодов:**' + globalVar.lineBreak
        totalSum.text += formatterDate(postObjectPrev1.period).date + ' - ' + factSumPrev1.nomenclature
        totalSum.text += formatterDate(postObjectPrev2.period).date + ' - ' + factSumPrev2.nomenclature
      }
      totalSum.text += '**Внесенные суммы**:' + globalVar.lineBreak
      var i = 1
      budgetRow.forEach(function (row) {
        var comma
        budgetRow.length > i ? comma = globalVar.lineBreak : comma = ''
        totalSum.text += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
        i += 1
      })
    }
    return totalSum
  } catch (e) {
    console.error('getSum: ' + e)
  } finally {
    console.log('getSum: complete')
  }
}