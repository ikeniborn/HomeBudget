function updateTrelloData(postObject) {
  try {
    var ss
    var sourceSheetName
    var sourceArray
    var ts
    var targetSheetName
    var targetArray
    var pushBufferRow
    var pushAccountRow
    var insertdate
    //* определение истоников
    if (postObject.isFact) {
      ss = postObject.sourceSheetNameFactTrelloOpen
      sourceSheetName = postObject.sourceSheetNameFactTrello
      sourceArray = postObject.sourceSheetNameFactTrelloArray
      ts = postObject.targetSheetNameFactOpen
      targetSheetName = postObject.targetSheetNameFact
    } else if (postObject.isBudget) {
      ss = postObject.sourceSheetNameBudgetTrelloOpen
      sourceSheetName = postObject.sourceSheetNameBudgetTrello
      sourceArray = postObject.sourceSheetNameBudgetTrelloArray
      ts = postObject.targetSheetNameBudgetOpen
      targetSheetName = postObject.targetSheetNameBudget
    } else if (postObject.isTarget) {
      ss = postObject.sourceSheetNameTargetTrelloOpen
      sourceSheetName = postObject.sourceSheetNameBudgetTrello
      sourceArray = postObject.sourceSheetNameTargetTrelloArray
      ts = postObject.targetSheetNameTargetOpen
      targetSheetName = postObject.targetSheetNameBudget
    }
    //* вставка значений в буфер
    var pushBufferRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId]
    ss.appendRow(pushBufferRow)
    if (postObject.isFact) {
      postObject.sourceSheetNameFactTrelloArray.push(pushBufferRow)
    } else if (postObject.isBudget) {
      postObject.sourceSheetNameBudgetTrelloArray.push(pushBufferRow)
    } else if (postObject.isTarget) {
      postObject.sourceSheetNameTargetTrelloArray.push(pushBufferRow)
    }
    //* вставка значений в учет
    if (postObject.account == 'Остатки') {
      var newPeriod = postObject.budgetPeriod
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      pushAccountRow = [insertdate, newPeriod, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName]
      ts.appendRow(pushAccountRow)
      if (postObject.isFact) {
        postObject.targetSheetNameFactArray.push(pushAccountRow)
      } else if (postObject.isBudget) {
        postObject.targetSheetNameBudgetArray.push(pushAccountRow)
      } else if (postObject.isTarget) {
        postObject.targetSheetNameTargetArray.push(pushAccountRow)
      }
    } else {
      pushAccountRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, sourceSheetName]
      ts.appendRow(pushAccountRow)
      if (postObject.isFact) {
        postObject.targetSheetNameFactArray.push(pushAccountRow)
      } else if (postObject.isBudget) {
        postObject.targetSheetNameBudgetArray.push(pushAccountRow)
      } else if (postObject.isTarget) {
        postObject.targetSheetNameTargetArray.push(pushAccountRow)
      }
    }
    //* Проверка перевода на счет семьи
    if (postObject.account == 'Перевод на счет Семья') {
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (postObject.cfo == 'Илья') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName]
        ts.appendRow(pushAccountRow)
        if (postObject.isFact) {
          postObject.targetSheetNameFactArray.push(pushAccountRow)
        } else if (postObject.isBudget) {
          postObject.targetSheetNameBudgetArray.push(pushAccountRow)
        } else if (postObject.isTarget) {
          postObject.targetSheetNameTargetArray.push(pushAccountRow)
        }
      } else if (postObject.cfo == 'Оксана') {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Приход', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, sourceSheetName]
        ts.appendRow(pushAccountRow)
        if (postObject.isFact) {
          postObject.targetSheetNameFactArray.push(pushAccountRow)
        } else if (postObject.isBudget) {
          postObject.targetSheetNameBudgetArray.push(pushAccountRow)
        } else if (postObject.isTarget) {
          postObject.targetSheetNameTargetArray.push(pushAccountRow)
        }
      }
    }
    //* Удаление пустых строк
    deleteEmptyRow(postObject.sourceSheetID, sourceSheetName)
    //* Удаление пустых строк
    deleteEmptyRow(postObject.targetSheetID, targetSheetName)
  } catch (e) {
    console.error('updateTrelloAccounting: ' + e)
  }
}