function updateTrelloData(postObject) {
  try {
    var pushBufferRow
    var pushAccountRow
    var insertdate
    //* вставка значений в буфер
    var ss = postObject.trelloOpen
    pushBufferRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, postObject.type]
    ss.appendRow(pushBufferRow)
    //* вставка значений в учет
    var ts = postObject.accountOpen
    var targetArray = postObject.accountArray
    pushAccountRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.cashFlow, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, postObject.type]
    ts.appendRow(pushAccountRow)
    targetArray.push(pushAccountRow)
    //* Проверка перевода на счет семьи
    if (postObject.account == 'Перевод на счет Семья') {
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (postObject.cfo == 'Илья') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, postObject.type]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
      } else if (postObject.cfo == 'Оксана') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, postObject.type]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
      }
    }
    //* получение данных учета после обновления
    postObject.dataAccount = getAllData(postObject, 'account')
    postObject.dataAccountFactCurr = getCurrData(postObject, 'Факт')
    postObject.dataAccountBudgetCurr = getCurrData(postObject, 'Бюджет')
    //* Удаление пустых строк
    deleteEmptyRow(postObject)
  } catch (e) {
    console.error('updateTrelloData: ' + e)
  }
}