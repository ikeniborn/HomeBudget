/* eslint-disable no-undef */
function getSum(postObject) {
  try {
    var budgetSum = getTotalSum(postObject, 'account', 'budget')
    var factSum = getTotalSum(postObject, 'account', 'fact')
    var totalSum = {}
    var budgetRow = budgetSum.row
    var groupBudgetRows = budgetSum.rows
    totalSum.bill = budgetSum.bill - factSum.bill
    totalSum.account = budgetSum.account - factSum.account
    totalSum.nomenclature = budgetSum.nomenclature - factSum.nomenclature
    totalSum.nomenclatureBudget = budgetSum.nomenclature
    totalSum.incomeFact = factSum.income
    totalSum.incomeBudget = budgetSum.income
    totalSum.expenseFact = factSum.expense
    totalSum.expenseBudget = budgetSum.expense
    totalSum.totalFact = factSum.income + factSum.rest - factSum.expense
    totalSum.totalBudget = budgetSum.income - budgetSum.expense
    totalSum.desc = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + postObject.lineBreak
    if (postObject.isFact) {
      //* описание для фактических карточек
      totalSum.desc += '**По номенклатуре**: ' + postObject.lineBreak
      totalSum.desc += '*Остаток*: ' + totalSum.nomenclature + ' р.' + postObject.lineBreak
      if (factSum.nomenclature != 0 && budgetSum.nomenclature != 0) {
        totalSum.desc += '*Исполнение*: ' + ((factSum.nomenclature / budgetSum.nomenclature) * 100).toFixed(2) + encodeData('%', '%') + postObject.lineBreak
      }
      totalSum.desc += '**По статье**: ' + postObject.lineBreak
      totalSum.desc += '*Остаток*: ' + totalSum.account + ' р.' + postObject.lineBreak
      if (factSum.account != 0 && budgetSum.account != 0) {
        totalSum.desc += '*Исполнение*: ' + ((factSum.account / budgetSum.account) * 100).toFixed(2) + encodeData('%', '%') + postObject.lineBreak
      }
      if (budgetRow.length != 0) {
        totalSum.desc += '**Бюджетные заявки:**' + postObject.lineBreak
        var i = 1
        budgetRow.forEach(function (row) {
          var comma
          budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
          totalSum.desc += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
          i += 1
        })
      }
      totalSum.comment = '**Остаток бюджета**:' + postObject.lineBreak
      totalSum.comment += '*' + postObject.nomenclature + '*: ' + totalSum.nomenclature + ' р.' + postObject.lineBreak
      totalSum.comment += '*' + postObject.account + '*: ' + totalSum.account + ' р.' + postObject.lineBreak
      totalSum.comment += '**Остаток средств** ' + '*' + postObject.cfo + '*: ' + totalSum.totalFact + ' р.' + postObject.lineBreak
      if (postObject.actionType == 'commentCard') {
        totalSum.comment += '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'updateComment') {
        totalSum.comment += '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'deleteComment') {
        totalSum.comment += '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      }
      if (postObject.comment.length !== 0) {
        totalSum.comment += '**Комментарий**: ' + postObject.comment + postObject.lineBreak
      }
    } else if (postObject.isBudget) {
      //* описание для бюджетных карточек
      totalSum.desc += '**Итого бюджет на** *' + formatterDate(postObject.budgetPeriod).date + '*:' + postObject.lineBreak
      totalSum.desc += '*По счету*: ' + budgetSum.bill + ' р.' + postObject.lineBreak
      totalSum.desc += '*По статье*: ' + budgetSum.account + ' р.' + postObject.lineBreak
      totalSum.desc += '*По номенклатуре*: ' + budgetSum.nomenclature + ' р.' + postObject.lineBreak
      if (postObject.isCurrBudget) {
        //* информация по рестроспективе за последние два месяца
        var postObjectPrev1 = postObject
        postObjectPrev1.period = postObject.factPeriod
        postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
        var factSumPrev1 = getTotalSum(postObjectPrev1, 'account', 'fact')
        var postObjectPrev2 = postObject
        postObjectPrev2.period = postObject.factPeriod0
        postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
        var factSumPrev2 = getTotalSum(postObjectPrev2, 'account', 'fact')
        totalSum.desc += '**Факт прошлых периодов:**' + postObject.lineBreak
        totalSum.desc += formatterDate(postObject.factPeriod).date + ' - ' + factSumPrev1.nomenclature + ' р.' + postObject.lineBreak
        totalSum.desc += formatterDate(postObject.factPeriod0).date + ' - ' + factSumPrev2.nomenclature + ' р.' + postObject.lineBreak
      }
      if (budgetRow.length != 0) {
        totalSum.desc += '**Бюджетные заявки**:' + postObject.lineBreak
        var i = 1
        budgetRow.forEach(function (row) {
          var comma
          budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
          totalSum.desc += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
          i += 1
        })
      }
      totalSum.descBalance = '**Итоговый бюджет** *' + formatterDate(postObject.budgetPeriod).date + '* **по статьям**' + ':' + postObject.lineBreak
      if (groupBudgetRows.length !== 0) {
        var i = 1
        groupBudgetRows.forEach(function (row) {
          var comma
          groupBudgetRows.length > i ? comma = postObject.lineBreak : comma = ''
          totalSum.descBalance += row.bill + ' - ' + row.account + ': ' + row.sum + ' р. ' + comma
          i += 1
        })
      }
      //* комментарий по бюджету
      totalSum.comment = '**Бюджет**:' + postObject.lineBreak
      totalSum.comment += '*' + postObject.nomenclature + '*: ' + budgetSum.nomenclature + ' р.' + postObject.lineBreak
      totalSum.comment += '*' + postObject.account + '*: ' + budgetSum.account + ' р.' + postObject.lineBreak
      totalSum.comment += '*' + postObject.bill + '*: ' + budgetSum.bill + ' р.' + postObject.lineBreak
      if (postObject.actionType == 'commentCard') {
        totalSum.comment += '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'updateComment') {
        totalSum.comment += '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'deleteComment') {
        totalSum.comment += '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      }
      if (postObject.comment.length !== 0) {
        totalSum.comment += '**Комментарий**: ' + postObject.comment + postObject.lineBreak
      }
    }
    return totalSum
  } catch (e) {
    console.error('getSum: ' + e)
  }
}