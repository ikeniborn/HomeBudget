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
          description.text += '*Исполнение*: ' + sum.nomenclatureBudgetExecution + encodeData('%', '%') + postObject.lineBreak
        }
        description.text += '**По статье**: ' + postObject.lineBreak
        description.text += '*Остаток*: ' + sum.accountBudgetRest + ' р.' + postObject.lineBreak
        if (sum.accountBudgetExecution != 0) {
          description.text += '*Исполнение*: ' + sum.accountBudgetExecution + encodeData('%', '%') + postObject.lineBreak
        }
      } else if (postObject.isBudget) {
        if (postObject.nomenclature !== 'Баланс') {
          //* описание для бюджетных карточек
          description.text += '**Итого бюджет на** *' + formatterDate(postObject.period).date + '*:' + postObject.lineBreak
          description.text += '*По счету*: ' + sum.billSum + ' р.' + postObject.lineBreak
          description.text += '*По статье*: ' + sum.accountSum + ' р.' + postObject.lineBreak
          description.text += '*По номенклатуре*: ' + sum.nomenclatureSum + ' р.' + postObject.lineBreak
          if (postObject.isCurrBudget) {
            //* информация в рестроспективе за последние два месяца
            description.text += '**Факт прошлых периодов:**' + postObject.lineBreak
            description.text += formatterDate(postObject.factPeriod).date + ' - ' + getPreviousFact(postObject).Prev1.nomenclatureSum + ' р.' + postObject.lineBreak
            description.text += formatterDate(postObject.factPeriod0).date + ' - ' + getPreviousFact(postObject).Prev2.nomenclatureSum + ' р.' + postObject.lineBreak
          }
        } else if (postObject.nomenclature == 'Баланс') {
          //* описание карточки баланса
          description.text = '**Итоговый бюджет** *' + formatterDate(postObject.period).date + '* **по статьям**' + ':' + postObject.lineBreak
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
          //* информация по переводам
          description.text += 'Перечислить в накопления: ' + sum.accumulationNomenclatureIncomeSum
          description.text += 'Снять с накоплений: ' + sum.accumulationNomenclatureExpenseSum
          description.text += 'Первый перевод на счет Семьи: ' + sum.firstTransferToFamilyAccount
        }
      }
      //* данные по бюджетным заявкам
      if (sum.nomenclatureBudgetRows.length != 0 && postObject.nomenclature !== 'Баланс') {
        var budgetRow = sum.nomenclatureBudgetRows
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