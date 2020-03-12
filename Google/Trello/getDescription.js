/* eslint-disable no-undef */
function getDescription(postObject) {
  try {
    if (postObject.useDesc == 1) {
      var description = {}
      var sum = getSum(postObject)
      description.text = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + postObject.lineBreak
      if (postObject.isFact) {
        //* описание для фактических карточек
        description.text += '**По номенклатуре**: ' + postObject.lineBreak
        description.text += '*Остаток*: ' + sum.nomenclatureBudgetRest + ' р.' + postObject.lineBreak
        if (sum.nomenclatureBudgetExecution != 0) {
          description.text += '*Исполнение*: ' + sum.executionBudgetNomenclature + encodeData('%', '%') + postObject.lineBreak
        }
        description.text += '**По статье**: ' + postObject.lineBreak
        description.text += '*Остаток*: ' + sum.accountBudgetRest + ' р.' + postObject.lineBreak
        if (sum.accountBudgetExecution != 0) {
          description.text += '*Исполнение*: ' + sum.accountBudgetExecution + encodeData('%', '%') + postObject.lineBreak
        }
      } else if (postObject.isBudget) {
        if (postObject.nomenclature !== 'Баланс') {
          //* описание для бюджетных карточек
          description.text += '**Итого бюджет на** *' + formatterDate(postObject.budgetPeriod).date + '*:' + postObject.lineBreak
          description.text += '*По счету*: ' + sum.billSum + ' р.' + postObject.lineBreak
          description.text += '*По статье*: ' + sum.accountSum + ' р.' + postObject.lineBreak
          description.text += '*По номенклатуре*: ' + sum.nomenclatureSum + ' р.' + postObject.lineBreak
          if (postObject.isCurrBudget) {
            //* информация в рестроспективе за последние два месяца
            var postObjectPrev1 = postObject
            postObjectPrev1.period = postObject.factPeriod
            postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
            var sumPrev1 = getSum(postObjectPrev1)
            var postObjectPrev2 = postObject
            postObjectPrev2.period = postObject.factPeriod0
            postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
            var sumPrev2 = getSum(postObjectPrev1)
            description.text += '**Факт прошлых периодов:**' + postObject.lineBreak
            description.text += formatterDate(postObject.factPeriod).date + ' - ' + sumPrev1.nomenclatureSum + ' р.' + postObject.lineBreak
            description.text += formatterDate(postObject.factPeriod0).date + ' - ' + sumPrev2.nomenclatureSum + ' р.' + postObject.lineBreak
          }
        } else if (postObject.nomenclature == 'Баланс') {
          //* описание карточки баланса
          description.text = '**Итоговый бюджет** *' + formatterDate(postObject.budgetPeriod).date + '* **по статьям**' + ':' + postObject.lineBreak
          if (sum.groupAccount.length !== 0) {
            var groupBudgetRows = sum.groupAccount
            var i = 1
            groupBudgetRows.forEach(function (row) {
              var comma
              groupBudgetRows.length > i ? comma = postObject.lineBreak : comma = ''
              description.text += row.bill + ' - ' + row.account + ': ' + row.sum + ' р. ' + comma
              i += 1
            })
          }
        }
      }
      //* данные по бюджетным заявкам
      if (sum.nomenclatureBudgetRows.length != 0 && postObject.nomenclature !== 'Баланс') {
        var budgetRow = sum.nomenclatureBudgetRows.length
        description.text += '**Бюджетные заявки**:' + postObject.lineBreak
        var i = 1
        budgetRow.forEach(function (row) {
          var comma
          budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
          description.text += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
          i += 1
        })
      }
    }
    description.haveBudget = sum.haveBudget
    return description
  } catch (e) {
    console.error('getDescription: ' + e)
  }
}