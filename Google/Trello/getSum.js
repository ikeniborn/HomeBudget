/* eslint-disable no-undef */
function getSum(postObject) {
  try {
    var budgetSum = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameBudget)
    var factSum = getTotalSum(postObject, postObject.targetSheetID, postObject.targetSheetNameFact)
    var totalSum = {}
    var budgetRow = budgetSum.row
    totalSum.bill = budgetSum.bill - factSum.bill
    totalSum.account = budgetSum.account - factSum.account
    totalSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
    totalSum.total = factSum.income - factSum.expense
    totalSum.text = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + postObject.lineBreak
    if (postObject.isFact) {
      //* описание для фактических карточек
      totalSum.text += '**По номенклатуре**: ' + postObject.lineBreak
      totalSum.text += '*Бюджет*: ' + budgetSum.nomenclature + ' р.' + postObject.lineBreak
      totalSum.text += '*Факт*: ' + factSum.nomenclature + ' р.' + postObject.lineBreak
      totalSum.text += '*Исполнение*: ' + totalSum.nomenclature + ' р.' + postObject.lineBreak
      totalSum.text += '**Остаток по статье**: ' + totalSum.account + ' р.' + postObject.lineBreak
      totalSum.text += '**Остаток средств** ' + ': ' + totalSum.total + ' р.' + postObject.lineBreak
      totalSum.text += '**Бюджетные заявки:**' + postObject.lineBreak
      var i = 1
      budgetRow.forEach(function (row) {
        var comma
        budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
        totalSum.text += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
        i += 1
      })
    } else {
      //* описание для бюджетных карточек
      totalSum.text += '**Бюджет** ' + formatterDate(postObject.period).date + ':' + postObject.lineBreak
      totalSum.text += '*По счету*: ' + budgetSum.bill + ' р.' + postObject.lineBreak
      totalSum.text += '*По статье*: ' + budgetSum.account + ' р.' + postObject.lineBreak
      totalSum.text += '*По номенклатуре*: ' + budgetSum.nomenclature + ' р.' + postObject.lineBreak
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
        totalSum.text += '**Факт прошлых периодов:**' + postObject.lineBreak
        totalSum.text += formatterDate(postObject.factPeriod).date + ' - ' + factSumPrev1.nomenclature + ' р.' + postObject.lineBreak
        totalSum.text += formatterDate(postObject.factPeriod0).date + ' - ' + factSumPrev2.nomenclature + ' р.' + postObject.lineBreak
      }
      totalSum.text += '**Бюджетные заявки**:' + postObject.lineBreak
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