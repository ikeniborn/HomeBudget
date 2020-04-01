/* eslint-disable no-undef */
function getDescription(postObject) {
  try {
    var description = {}
    var sum = getSum(postObject)
    description.text = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + postObject.lineBreak
    if (postObject.isFact) {
      //* описание для фактических карточек
      description.text += '**По номенклатуре**: ' + postObject.lineBreak
      description.text += '*Остаток*: ' + sum.totalSum.nomenclatureBudgetRest + ' р.' + postObject.lineBreak
      if (sum.totalSum.nomenclatureBudgetExecution != 0) {
        description.text += '*Исполнение*: ' + sum.totalSum.nomenclatureBudgetExecution + encodeData('%', '%') + postObject.lineBreak
      }
      description.text += '**По статье**: ' + postObject.lineBreak
      description.text += '*Остаток*: ' + sum.totalSum.accountBudgetRest + ' р.' + postObject.lineBreak
      if (sum.totalSum.accountBudgetExecution != 0) {
        description.text += '*Исполнение*: ' + sum.totalSum.accountBudgetExecution + encodeData('%', '%') + postObject.lineBreak
      }
    } else if (postObject.isBudget) {
      if (postObject.nomenclature !== 'Баланс') {
        //* описание для бюджетных карточек
        description.text += '**Итого бюджет на** *' + formatterDate(postObject.period).date + '*:' + postObject.lineBreak
        description.text += '*По операции*: ' + sum.budgetSum.cashFlowSum + ' р.' + postObject.lineBreak
        description.text += '*По счету*: ' + sum.budgetSum.billSum + ' р.' + postObject.lineBreak
        description.text += '*По статье*: ' + sum.budgetSum.accountSum + ' р.' + postObject.lineBreak
        description.text += '*По номенклатуре*: ' + sum.budgetSum.nomenclatureSum + ' р.' + postObject.lineBreak
        if (postObject.isCurrBudget) {
          //* информация в рестроспективе за последние два месяца
          description.text += '**Факт прошлых периодов:**' + postObject.lineBreak
          description.text += formatterDate(postObject.factPeriod).date + ' - ' + getPreviousFact(postObject).Prev1.factSum.nomenclatureSum + ' р.' + postObject.lineBreak
          description.text += formatterDate(postObject.factPeriod0).date + ' - ' + getPreviousFact(postObject).Prev2.factSum.nomenclatureSum + ' р.' + postObject.lineBreak
        }
      } else if (postObject.nomenclature == 'Баланс') {
        //* описание карточки баланса
        description.text = '**Итоговый бюджет** *' + formatterDate(postObject.period).date + '* **по статьям**' + ':' + postObject.lineBreak
        if (sum.budgetSum.groupAccount.length !== 0) {
          var groupBudgetRows = sum.budgetSum.groupAccount
          var i = 1
          groupBudgetRows.forEach(function (row) {
            description.text += row.bill + ' - ' + row.account + ': ' + row.sum + ' р. ' + postObject.lineBreak
            i += 1
          })
        }
        description.text += '**Остатки**: ' + sum.factSum.restSum + ' р.' + postObject.lineBreak
        description.text += '**Операционный бюджет**: ' + sum.budgetSum.costSum + ' р.' + postObject.lineBreak
        description.text += '**Бюджет отчислений**: ' + sum.budgetSum.accumulationBillExpenseSum + ' р.' + postObject.lineBreak
        //* информация по переводам
        if (postObject.privateBudget) {
          description.text += '**Перечисления**: ' + postObject.lineBreak
          description.text += '*Первый перевод на счет Семьи*: ' + sum.totalSum.firstTransferToFamilyAccount + postObject.lineBreak
          description.text += '*Перечислить в накопления*: ' + sum.budgetSum.accumulationNomenclatureExpenseSum + postObject.lineBreak
          description.text += '*Снять с накоплений*: ' + sum.budgetSum.accumulationNomenclatureIncomeSum
        }
      }
    }
    //* данные по бюджетным заявкам
    if (sum.budgetSum.nomenclatureRows.length != 0 && postObject.nomenclature !== 'Баланс') {
      var budgetRow = sum.budgetSum.nomenclatureRows
      description.text += '**Бюджетные заявки**:' + postObject.lineBreak
      var i = 1
      budgetRow.forEach(function (row) {
        var comma
        budgetRow.length > i ? comma = postObject.lineBreak : comma = ''
        description.text += formatterDate(row.actionDate).time + ': ' + row.sum + ' р. ' + row.comment + comma
        i += 1
      })
    }
    description.haveBudget = sum.totalSum.haveBudget
    return description
  } catch (e) {
    postObject.error = 'getDescription: ' + e
    addError(postObject)
  }
}