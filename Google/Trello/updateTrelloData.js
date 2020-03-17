function updateTrelloData(postObject) {
  try {
    var pushBufferRow
    var pushAccountRow
    var insertdate
    var targetArray
    //* определение истоников
    var ss = postObject.sourceSheetNameFactTrelloOpen
    var sourceArray = postObject.dataTrelloAllCurr
    var ts = postObject.targetSheetNameFactOpen
    if (postObject.isFact) {
      targetArray = postObject.dataAccountFactCurr
    } else if (postObject.isBudget) {
      targetArray = postObject.dataAccountBudgetCurr
    }
    //* вставка значений в буфер
    pushBufferRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, postObject.source]
    ss.appendRow(pushBufferRow)
    sourceArray.push(pushBufferRow)
    //* вставка значений в учет
    if (postObject.account == 'Остатки') {
      var newPeriod = postObject.budgetPeriod
      insertdate = new Date(postObject.actionDate.getTime() + 1000)
      pushAccountRow = [insertdate, newPeriod, postObject.cfo, postObject.mvz, postObject.cashFlow, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, postObject.source]
      ts.appendRow(pushAccountRow)
      targetArray.push(pushAccountRow)
    } else {
      pushAccountRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.cashFlow, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, postObject.source]
      ts.appendRow(pushAccountRow)
      targetArray.push(pushAccountRow)
    }
    //* Проверка перевода на счет семьи
    if (postObject.account == 'Перевод на счет Семья') {
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (postObject.cfo == 'Илья') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, postObject.source]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
      } else if (postObject.cfo == 'Оксана') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, postObject.source]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
      }
    }
    //* Удаление пустых строк
    deleteEmptyRow(postObject)
  } catch (e) {
    console.error('updateTrelloAccounting: ' + e)
  }
}