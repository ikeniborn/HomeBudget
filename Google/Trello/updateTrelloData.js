function updateTrelloData(postObject) {
  try {
    var ss
    var sourceArray
    var ts
    var targetArray
    var pushBufferRow
    var pushAccountRow
    var insertdate
    //* определение истоников
    if (postObject.isFact) {
      ss = postObject.sourceSheetNameFactTrelloOpen
      sourceArray = postObject.sourceSheetNameFactTrelloArray
      ts = postObject.targetSheetNameFactOpen
    } else if (postObject.isBudget) {
      ss = postObject.sourceSheetNameBudgetTrelloOpen
      sourceArray = postObject.sourceSheetNameBudgetTrelloArray
      ts = postObject.targetSheetNameBudgetOpen
    } else if (postObject.isTarget) {
      ss = postObject.sourceSheetNameTargetTrelloOpen
      sourceArray = postObject.sourceSheetNameTargetTrelloArray
      ts = postObject.targetSheetNameTargetOpen
    }
    //* вставка значений в буфер
    pushBufferRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId]
    ss.appendRow(pushBufferRow)
    sourceArray.push(pushBufferRow)
    //* вставка значений в учет
    if (postObject.account == 'Остатки') {
      var newPeriod = postObject.budgetPeriod
      insertdate = new Date(postObject.actionDate.getTime() + 1000)
      pushAccountRow = [insertdate, newPeriod, postObject.cfo, postObject.mvz, postObject.cashFlow, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId]
      ts.appendRow(pushAccountRow)
      targetArray.push(pushAccountRow)
    } else {
      pushAccountRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.cashFlow, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId]
      ts.appendRow(pushAccountRow)
      targetArray.push(pushAccountRow)
    }
    //* Проверка перевода на счет семьи
    if (postObject.account == 'Перевод на счет Семья') {
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (postObject.cfo == 'Илья') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
      } else if (postObject.cfo == 'Оксана') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
        targetArray.push(pushAccountRow)
      }
    }
    //* Удаление пустых строк
    deleteEmptyRow(postObject)
  } catch (e) {
    console.error('updateTrelloAccounting: ' + e)
  }
}