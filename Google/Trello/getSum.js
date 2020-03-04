/* eslint-disable no-undef */
function getSum(postObject) {
  try {
    var budgetSum = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameBudget)
    var factSum = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameFact)
    var totalSum = {}
    var budgetRow = budgetSum.row
    var budgetRows = budgetSum.rows
    totalSum.bill = budgetSum.bill - factSum.bill
    totalSum.account = budgetSum.account - factSum.account
    totalSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
    totalSum.incomeFact = factSum.income
    totalSum.incomeBudget = budgetSum.income
    totalSum.expenseFact = factSum.expense
    totalSum.expenseBudget = budgetSum.expense
    totalSum.totalFact = factSum.income - factSum.expense
    totalSum.totalBudget = budgetSum.income - budgetSum.expense
    totalSum.desc = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + postObject.lineBreak
    if (postObject.isFact) {
      //* описание для фактических карточек
      totalSum.desc += '**По номенклатуре**: ' + postObject.lineBreak
      totalSum.desc += '*Остаток*: ' + totalSum.nomenclature + ' р.' + postObject.lineBreak
      totalSum.desc += '*Исполнение*: ' + ((factSum.nomenclature / budgetSum.nomenclature) * 100).toFixed(2) + encodeData('%', '%') + postObject.lineBreak
      totalSum.desc += '**По статье**: ' + postObject.lineBreak
      totalSum.desc += '*Остаток*: ' + totalSum.account + ' р.' + postObject.lineBreak
      totalSum.desc += '*Исполнение*: ' + ((factSum.account / budgetSum.account) * 100).toFixed(2) + encodeData('%', '%') + postObject.lineBreak
      totalSum.desc += '**Бюджетные заявки:**' + postObject.lineBreak
      var i = 1
      budgetRow.forEach(function (row) {
        var comma
        budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
        totalSum.desc += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
        i += 1
      })
      if (postObject.isCurrFact) {
        totalSum.comment = '**Остаток**:' + postObject.lineBreak
        totalSum.comment += '*' + postObject.nomenclature + '*: ' + totalSum.nomenclature + postObject.lineBreak
        totalSum.comment += '*' + postObject.account + '*: ' + totalSum.account + postObject.lineBreak
        totalSum.comment += '*' + postObject.listName + '*: ' + totalSum.totalFact + ' р.' + postObject.lineBreak
        totalSum.comment = '**Внесенная сумма**:' + postObject.sum + postObject.lineBreak
        totalSum.comment = '**Комментарий**:' + postObject.comment + postObject.lineBreak
      } else if (postObject.isCurrBudget) {}
    } else {
      //* описание для бюджетных карточек
      totalSum.desc += '**Итого бюджет на** ' + formatterDate(postObject.period).date + ':' + postObject.lineBreak
      totalSum.desc += '*По счету*: ' + budgetSum.bill + ' р.' + postObject.lineBreak
      totalSum.desc += '*По статье*: ' + budgetSum.account + ' р.' + postObject.lineBreak
      totalSum.desc += '*По номенклатуре*: ' + budgetSum.nomenclature + ' р.' + postObject.lineBreak
      if (postObject.isCurrBudget) {
        //* информация по рестроспективе за последние два месяца
        var postObjectPrev1 = postObject
        postObjectPrev1.period = postObject.factPeriod
        postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
        var factSumPrev1 = getTotalSum(postObjectPrev1, postObject.targetSheetID, postObject.targetSheetNameFact)
        var postObjectPrev2 = postObject
        postObjectPrev2.period = postObject.factPeriod0
        postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
        var factSumPrev2 = getTotalSum(postObjectPrev2, postObject.targetSheetID, postObject.targetSheetNameFact)
        totalSum.desc += '**Факт прошлых периодов:**' + postObject.lineBreak
        totalSum.desc += formatterDate(postObject.factPeriod).date + ' - ' + factSumPrev1.nomenclature + ' р.' + postObject.lineBreak
        totalSum.desc += formatterDate(postObject.factPeriod0).date + ' - ' + factSumPrev2.nomenclature + ' р.' + postObject.lineBreak
      }
      totalSum.desc += '**Бюджетные заявки**:' + postObject.lineBreak
      var i = 1
      budgetRow.forEach(function (row) {
        var comma
        budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
        totalSum.desc += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
        i += 1
      })
    }
    return totalSum
  } catch (e) {
    console.error('getSum: ' + e)
  }
}