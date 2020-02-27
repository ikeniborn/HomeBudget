/* eslint-disable no-undef */
function getSum(postObject) {
  try {
    var budgetSum = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameBudget)
    var factSum = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameFact)
    var totalSum = {}
    totalSum.bill = budgetSum.bill - factSum.bill
    totalSum.account = budgetSum.account - factSum.account
    totalSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
    totalSum.total = factSum.income - factSum.expense
    totalSum.text = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + postObject.lineBreak
    if (postObject.isFact) {
      //* описание для фактических карточек
      totalSum.text += '**Остаток бюджета**:' + postObject.lineBreak
      totalSum.text += postObject.listName + ': ' + totalSum.bill + ' р.,' + postObject.lineBreak
      totalSum.text += postObject.account + ': ' + totalSum.account + ' р.,' + postObject.lineBreak
      totalSum.text += postObject.nomenclature + ': ' + totalSum.nomenclature + ' р.' + postObject.lineBreak
      totalSum.text += '**Остаток средств** ' + ': ' + totalSum.total + ' р.'
    } else {
      //* описание для бюджетных карточек
      var budgetRow = budgetSum.row
      totalSum.text += '**Итого бюджет** ' + formatterDate(postObject.period).date + ':' + postObject.lineBreak
      totalSum.text += postObject.listName + ': ' + budgetSum.bill + ' р.' + postObject.lineBreak
      totalSum.text += postObject.account + ': ' + budgetSum.account + ' р.' + postObject.lineBreak
      totalSum.text += postObject.nomenclature + ': ' + budgetSum.nomenclature + ' р.' + postObject.lineBreak
      if ([globalVar.boardIdBudget].indexOf(postObject.boardId) !== -1) {
        //* информация по рестроспективе за последние два месяца
        var postObjectPrev1 = postObject
        postObjectPrev1.period = new Date(postObject.period.getYear(), postObject.period.getMonth() - 1, 1)
        postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
        var postObjectPrev2 = postObject
        var factSumPrev1 = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameFact, postObjectPrev1)
        postObjectPrev2.period = new Date(postObject.period.getYear(), postObject.period.getMonth() - 2, 1)
        postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
        var factSumPrev2 = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameFact, postObjectPrev2)
        totalSum.text += '**Факт прошлых периодов:**' + postObject.lineBreak
        totalSum.text += formatterDate(postObjectPrev1.period).date + ' - ' + factSumPrev1.nomenclature
        totalSum.text += formatterDate(postObjectPrev2.period).date + ' - ' + factSumPrev2.nomenclature
      }
      totalSum.text += '**Внесенные суммы**:' + postObject.lineBreak
      var i = 1
      budgetRow.forEach(function (row) {
        var comma
        budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
        totalSum.text += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
        i += 1
      })
    }
    return totalSum
  } catch (e) {
    console.error('getSum: ' + e)
  }
}