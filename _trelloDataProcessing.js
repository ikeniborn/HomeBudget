function addErrorItem(error) {
  try {
    var globalVariable = getGlobalVariable()
    var errorOpen = openGoogleSheet(globalVariable.sourceSheetID, globalVariable.sourceSheetNameError)
    errorOpen.appendRow([formatterDate().timestamp, '', '', error])
  } catch (e) {
    console.error(arguments.callee.name + ': ' + e)
  }
}

function objectToString(data) {
  try {
    return JSON.stringify(data)
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function addLog(postData) {
  try {
    var globalVariable = getGlobalVariable()
    var sourceOpen = openGoogleSheet(globalVariable.sourceSheetID, globalVariable.sourceSheetNameLog)
    var startDate = getPreviousDate(180)
    var sourceArray = getGoogleSheetValues(sourceOpen).reduce(function (row, array, index) {
      if (index != 0) {
        if (array[0] >= startDate) {
          row.push(array)
        }
      }
      return row
    }, [])
    var isNewAction = sourceArray.reduce(function (row, array) {
      if (isMatch(postData.action.id, array[2])) {
        row = false
      }
      return row
    }, true)
    if (isNewAction) {
      sourceOpen.appendRow([formatterDate().timestamp, postData.action.type, postData.action.id])
    }
    return isNewAction
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function openGoogleSheet(sheetID, sheetName) {
  try {
    return SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function getGoogleSheetValues(openSheet) {
  try {
    return openSheet.getDataRange().getValues()
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function isValidDate(d) {
  try {
    if (Object.prototype.toString.call(d) !== '[object Date]') {
      return false
    } else {
      return !isNaN(d.getTime())
    }
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function isValidString(d) {
  try {
    if (Object.prototype.toString.call(d) == '[object String]') {
      return true
    } else {
      return false
    }
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function isMatch(where, what) {
  try {
    if (isValidString(where) && isValidString(what)) {
      if (where.toLowerCase().replace(/\s+/g, '').trim().match(what.toLowerCase().replace(/\s+/g, '').trim())) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function getYMD(date) {
  try {
    var object = {}
    object.y = new Date(date).getFullYear()
    object.m = new Date(date).getMonth() + 1
    object.d = new Date(date).getDate()
    object.ymd = object.y.toString() + object.m.toString() + object.d.toString()
    return object
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function copyObject(object) {
  try {
    if (Object.prototype.toString.call(object) == '[object Object]') {
      return Object.assign({}, object)
    } else {
      return {}
    }
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function getPreviousDate(n) {
  /*
   * n - количество дней
   */
  try {
    var endDate = new Date()
    var startDate = new Date()
    startDate.setDate(endDate.getDate() - n)
    return startDate
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function encodeData(data, symbol) {
  try {
    var encodeSymbol = encodeURIComponent(symbol)
    var encodeData = encodeURIComponent(data)
    if (isMatch(encodeData, encodeSymbol)) {
      return data.replace(symbol, encodeURIComponent(symbol))
    } else {
      return data
    }
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function addErrorArray(postObject) {
  try {
    if (postObject.error.length > 0) {
      var errorOpen = postObject.errorOpen
      var errorText = ''
      var i = 0
      var errorArray = postObject.error
      var errorArrayLenght = postObject.error.length
      errorArray.map(function (row) {
        i += 1
        errorText += row
        errorArrayLenght == i ? errorText += '' : errorText += '\n'
        return row
      })
      errorOpen.appendRow([postObject.webHookDate, postObject.actionType, postObject.webHookActionId, errorText])
      var subject = postObject.webHookDate + ' - ' + postObject.actionType
      MailApp.sendEmail('ikeniborn@gmail.com', subject, errorText)
    }
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function deleteLog(postObject) {
  try {
    var sourceOpen = postObject.logOpen
    var startDate = getPreviousDate(90)
    var deleteArrya = []
    getGoogleSheetValues(sourceOpen).reduce(function (row, array, index) {
      if (index > 0) {
        if (array[0] <= startDate) {
          deleteArrya.push(index + 1)
        }
      }
      return row
    }, [])
    if (deleteArrya.length > 0) {
      var startDeleteIndex = deleteArrya.reduce(function (a, b) {
        return a < b ? a : b
      })
      var countDeleteRow = deleteArrya.reduce(function (a, b) {
        return a > b ? a : b
      })
      sourceOpen.deleteRows(startDeleteIndex, countDeleteRow)
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function deleteError(postObject) {
  try {
    var errorOpen = postObject.errorOpen
    var startDate = getPreviousDate(1)
    var deleteArrya = []
    postObject.errorArray.reduce(function (row, array, index) {
      if (index > 0) {
        if (array[0] <= startDate) {
          deleteArrya.push(index + 1)
        }
      }
      return row
    }, [])
    if (deleteArrya.length > 0) {
      var startDeleteIndex = deleteArrya.reduce(function (a, b) {
        return a < b ? a : b
      })
      var countDeleteRow = deleteArrya.reduce(function (a, b) {
        return a > b ? a : b
      })
      errorOpen.deleteRows(startDeleteIndex, countDeleteRow)
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getPostObject(postData) {
  try {
    var object = Object.assign({}, getGlobalVariable())
    object.webHookDate = formatterDate().timestamp
    object.actionType = postData.action.type
    object.webHookActionId = postData.action.id
    // открытие листов
    object.financialCenterSheetOpen = openGoogleSheet(object.sourceSheetID, object.financialCenterSheetName)
    object.accountingItemSheetOpen = openGoogleSheet(object.sourceSheetID, object.accountingItemSheetName)
    object.costСenterSheetOpen = openGoogleSheet(object.sourceSheetID, object.costСenterSheetName)
    object.parametrSheetOpen = openGoogleSheet(object.sourceSheetID, object.parametrSheetName)
    object.goalsSheetOpen = openGoogleSheet(object.sourceSheetID, object.goalsSheetName)
    object.trelloOpen = openGoogleSheet(object.sourceSheetID, object.sourceSheetNameTrello)
    object.errorOpen = openGoogleSheet(object.sourceSheetID, object.sourceSheetNameError)
    object.logOpen = openGoogleSheet(object.sourceSheetID, object.sourceSheetNameLog)
    object.accountOpen = openGoogleSheet(object.targetSheetID, object.targetSheetNameAccount)
    object.targetOpen = openGoogleSheet(object.targetSheetID, object.targetSheetNameTarget)
    // данные с листов
    object.financialСenterArray = getGoogleSheetValues(object.financialCenterSheetOpen)
    object.accountingItemArray = getGoogleSheetValues(object.accountingItemSheetOpen)
    object.costСenterArray = getGoogleSheetValues(object.costСenterSheetOpen)
    object.parametrArray = getGoogleSheetValues(object.parametrSheetOpen)
    object.goalsArray = getGoogleSheetValues(object.goalsSheetOpen)
    object.trelloArray = getGoogleSheetValues(object.trelloOpen)
    object.errorArray = getGoogleSheetValues(object.errorOpen)
    object.accountArray = getGoogleSheetValues(object.accountOpen)
    object.targetArray = getGoogleSheetValues(object.targetOpen)
    if (['updateComment', 'deleteComment'].indexOf(postData.action.type) !== -1) {
      object.actionId = postData.action.data.action.id
    } else {
      object.actionId = postData.action.id
    }
    object.actionDate = new Date(postData.action.date)
    object.memberId = postData.action.memberCreator.id
    object.memberUsername = postData.action.memberCreator.username
    object.boardId = postData.action.data.board.id
    object.boardName = postData.action.data.board.name
    if ([object.boardIdFact, object.boardIdFact0].indexOf(object.boardId) !== -1) {
      object.isFact = true
      if ([object.boardIdFact].indexOf(object.boardId) !== -1) {
        object.isCurrFact = true
      } else {
        object.isCurrFact = false
      }
      object.isBudget = false
      object.isCurrBudget = false
      object.isTarget = false
      object.type = 'Факт'
    } else if ([object.boardIdBudget, object.boardIdBudget2, object.boardIdBudget3].indexOf(object.boardId) !== -1) {
      object.isFact = false
      object.isCurrFact = false
      object.isBudget = true
      if ([object.boardIdBudget].indexOf(object.boardId) !== -1) {
        object.isCurrBudget = true
      } else {
        object.isCurrBudget = false
      }
      object.isTarget = false
      object.type = 'Бюджет'
    } else if ([object.boardIdTarget].indexOf(object.boardId) !== -1) {
      object.isFact = false
      object.isCurrFact = false
      object.isBudget = false
      object.isCurrBudget = false
      object.isTarget = true
      object.type = 'Факт'
    }
    if (['deleteComment', 'updateComment', 'commentCard', 'updateCard'].indexOf(postData.action.type) !== -1) {
      object.cardId = postData.action.data.card.id
      object.cardName = postData.action.data.card.name
      object.cardDescription = ''
      object.cardComment = ''
      object.cardLabelColor = getCardLabel(object).item.color
    }
    if (['commentCard', 'createList', 'updateList', 'updateCard'].indexOf(postData.action.type) !== -1) {
      object.list = {}
      object.listId = object.action.data.list.id
      object.listName = object.action.data.list.name
      if (['updateList'].indexOf(object.action.type) !== -1) {
        object.listClosed = object.action.data.list.closed
      }
      if (['updateCard'].indexOf(object.action.type) !== -1) {
        object.cardClosed = object.action.data.card.closed
      }
    } else if (['updateComment', 'deleteComment'].indexOf(object.action.type) !== -1) {
      object.list = getCardList(object)
      object.listId = object.list.id
      object.listName = object.list.name
    }
    if (object.isTarget) {
      object.cfo = getTarget(object).item.cfo
    } else {
      object.cfo = getFinancialСenter(object).item.cfo
    }
    if (['Илья', 'Оксана'].indexOf(object.cfo) !== -1) {
      object.privateBudget = true
    } else {
      object.privateBudget = false
    }
    if (['deleteComment', 'updateComment', 'commentCard', 'updateCard'].indexOf(object.action.type) !== -1) {
      object.accountingItem = getAccountingItem(object)
      object.cashFlow = object.accountingItem.item.cashFlow
      object.bill = object.accountingItem.item.bill
      object.account = object.accountingItem.item.account
      object.nomenclature = object.action.data.card.name
      if (['updateComment', 'commentCard'].indexOf(object.action.type) !== -1) {
        if (['updateComment'].indexOf(object.action.type) !== -1) {
          object.text = postData.action.data.action.text
        } else {
          object.text = postData.action.data.text
        }
        object.parseText = parseComment(object)
        object.sum = object.parseText.sum
        if (['updateComment'].indexOf(postData.action.type) !== -1) {
          var objectOld = copyObject(object)
          objectOld.text = postData.action.data.old.text
          object.oldSum = parseComment(objectOld).sum
        }
        object.comment = object.parseText.comment
        if (object.isTarget) {
          object.mvz = getTarget(object).item.goal
        } else {
          object.mvz = getCostСenter(object).item.mvz
        }
      }
    }
    if (['createList', 'updateList'].indexOf(postData.action.type) !== -1) {
      var currDate = new Date()
      object.period = new Date(currDate.getFullYear(), currDate.getMonth(), 1)
      object.ymd = getYMD(object.period)
      object.factPeriod2 = new Date(object.period.getFullYear(), object.period.getMonth() - 2, 1)
      object.factPeriod1 = new Date(object.period.getFullYear(), object.period.getMonth() - 1, 1)
      object.factPeriod = object.period
      object.budgetPeriod = new Date(object.period.getFullYear(), object.period.getMonth() + 1, 1)
      object.budgetPeriod2 = new Date(object.period.getFullYear(), object.period.getMonth() + 2, 1)
      object.budgetPeriod3 = new Date(object.period.getFullYear(), object.period.getMonth() + 3, 1)
    } else {
      object.date = getPeriod(object)
      object.period = object.date.period
      object.ymd = object.date.ymd
      object.factPeriod2 = object.date.factPeriod2
      object.factPeriod1 = object.date.factPeriod1
      object.factPeriod = object.date.factPeriod
      object.budgetPeriod = object.date.budgetPeriod
      object.budgetPeriod2 = object.date.budgetPeriod2
      object.budgetPeriod3 = object.date.budgetPeriod3
    }
    if (['deleteComment', 'updateComment', 'commentCard'].indexOf(postData.action.type) !== -1) {
      object.dataTrello = getAllData(object, 'trello')
    }
    if (['deleteComment', 'updateComment'].indexOf(postData.action.type) !== -1) {
      object.isOldData = isOldData(object)
    } else {
      object.isOldData = false
    }
    object.error = []
    return object
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

// обновление параметра
function addTarget(postObject) {
  /*
   * @postObject - входные параметра запроса
   * */
  try {
    var ss = postObject.goalsSheetOpen
    var array = getTarget(postObject).array
    var goal = getTarget(postObject).item.goal
    var cfo = getFinancialСenter(postObject).item.cfo
    var objGoal = postObject.listName.toLowerCase().replace(cfo.toLowerCase(), '').trim()
    var newGoal = objGoal[0].toUpperCase() + objGoal.slice(1)
    var goalArray = array.map(function (array) {
      return array.name
    })
    var ssMvz = postObject.costСenterSheetOpen
    var postObjectCopy = copyObject(postObject)
    postObjectCopy.comment = objGoal
    postObjectCopy.cfo = cfo
    var arrayMvz = getCostСenter(postObjectCopy).array
    var tagMvz = objGoal.toLowerCase().replace(/\s+/g, '').trim()
    var newIdMvz = arrayMvz.length + 1
    if (goal == undefined) {
      var newId = goalArray.length + 1
      ss.appendRow([newId, postObject.listName, newGoal, cfo, formatterDate().timestamp, postObject.listId, 'actual'])
      ssMvz.appendRow([newIdMvz, objGoal, tagMvz])
      postObject.goalsArray = getGoogleSheetValues(postObject.goalsSheetOpen)
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function closedBudgetPeriod(postObject) {
  try {
    var postObjectBudget = copyObject(postObject)
    postObjectBudget.boardId = postObjectBudget.boardIdBudget
    postObjectBudget.listId = getList(postObjectBudget).id
    postObjectBudget.listName = postObjectBudget.cfo + ' ' + formatterDate(postObjectBudget.budgetPeriod).date
    archiveAllCards(postObjectBudget)
    updateList(postObjectBudget)
    var postObjectBudget2 = copyObject(postObjectBudget)
    postObjectBudget2.boardId = postObjectBudget2.boardIdBudget2
    postObjectBudget2.listId = getList(postObjectBudget2).id
    postObjectBudget2.listName = postObjectBudget2.cfo + ' ' + formatterDate(postObjectBudget2.budgetPeriod2).date
    moveAllCards(postObjectBudget2, postObjectBudget)
    updateList(postObjectBudget2)
    var postObjectBudget3 = copyObject(postObjectBudget2)
    postObjectBudget3.boardId = postObjectBudget3.boardIdBudget3
    postObjectBudget3.listId = getList(postObjectBudget3).id
    postObjectBudget3.listName = postObjectBudget3.cfo + ' ' + formatterDate(postObjectBudget3.budgetPeriod3).date
    moveAllCards(postObjectBudget3, postObjectBudget2)
    createCardsForList(postObjectBudget3)
    updateList(postObjectBudget3)
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function closedFactPeriod(postObject) {
  try {
    var postObjectFact0 = copyObject(postObject)
    postObjectFact0.boardId = postObjectFact0.boardIdFact0
    postObjectFact0.listId = getList(postObjectFact0).id
    postObjectFact0.listName = postObjectFact0.cfo + ' ' + formatterDate(postObjectFact0.factPeriod1).date
    if (postObjectFact0.listId == undefined) {
      postObjectFact0.listId = addList(postObjectFact0).id
    } else {
      //* закрытие листа на доске факт-1
      archiveAllCards(postObjectFact0)
      updateList(postObjectFact0)
    }
    //* Перенос карточек на доску факт-1
    moveAllCards(postObject, postObjectFact0)
    //* обновление текущего листа факта
    postObject.listName = postObject.cfo + ' ' + formatterDate(postObject.factPeriod).date
    updateList(postObject)
    //* создание карточек на листе факт
    createCardsForList(postObject)
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function createCardsForList(postObject) {
  try {
    var accountArray = getAccountingItem(postObject).array
    var accountItems
    if (postObject.isFact) {
      accountItems = accountArray.filter(function (row) {
        return row.fact == 1
      })
    } else if (postObject.isBudget) {
      accountItems = accountArray.filter(function (row) {
        return row.budget == 1
      })
    } else if (postObject.isTarget) {
      accountItems = accountArray.filter(function (row) {
        return row.target == 1
      })
    }
    //* Информация по меткам
    var labelList = getBoardLabel(postObject, postObject.boardId)
    //* создание карточек на листе факт
    accountItems.forEach(function (accounts) {
      var label = labelList.reduce(function (row, arrya) {
        if (isMatch(accounts.color, arrya.color)) {
          row = {}
          row.id = arrya.id
        }
        return row
      })
      addCard(postObject, accounts.nomenclature, postObject.listId, accounts.id, label.id)
    })
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function deleteEmptyRow(postObject) {
  try {
    var ss = postObject.trelloOpen
    var ts = postObject.accountOpen
    var ssMaxRows = ss.getMaxRows()
    var ssLastRow = ss.getLastRow()
    if (ssMaxRows - ssLastRow !== 0) {
      ss.deleteRows(ssLastRow + 1, ssMaxRows - ssLastRow)
    }
    var tsMaxRows = ts.getMaxRows()
    var tsLastRow = ts.getLastRow()
    if (tsMaxRows - tsMaxRows !== 0) {
      ss.deleteRows(tsLastRow + 1, tsMaxRows - tsLastRow)
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function deleteRowByActionId(postObject) {
  try {
    var ss
    var sourceData
    var sourceRows
    var ts
    var targetData
    var targetRowIndex = []
    var sum = 0
    //* удаление данных на листе источнике
    ss = postObject.trelloOpen
    sourceData = postObject.dataTrello.all
    sourceRows = sourceData.reduce(function (row, array) {
      if (isMatch(array.actionId, postObject.actionId)) {
        row.push(array)
      }
      row.sort(function (a, b) {
        return b.indexRow - a.indexRow
      })
      return row
    }, [])
    sourceRows.forEach(function (row) {
      ss.deleteRow(row.indexRow)
      sum = row.sum
    })
    //* удаление данных на листе учета
    ts = postObject.accountOpen
    targetData = postObject.accountArray
    targetData.reduce(function (row, array, index) {
      if (isMatch(postObject.actionId, array[10])) {
        row = index + 1
        targetRowIndex.push(row)
      }
      return row
    }, [])
    targetRowIndex.forEach(function (row) {
      ts.deleteRow(row)
      //* удаление данных в массиве учета
      targetData.splice(row - 1, 1)
    })
    //* получение данных учета после обновления
    postObject.dataAccount = getAllData(postObject, 'account')
    return sum
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function formatterDate(date) {
  //* форматирование даты
  try {
    if (date == undefined) {
      date = new Date()
    }
    var formatter = {}
    formatter.date = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy')
    formatter.time = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy HH:mm')
    formatter.timestamp = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy HH:mm:ss')
    return formatter
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function getAccountingItem(postObject) {
  //* получаение справочника статей
  try {
    var array = postObject.accountingItemArray
    if (postObject.cardName == undefined) {
      postObject.cardName = ''
      postObject.cardLabelColor = ''
    }
    var object = {}
    object.item = {}
    object.array = []
    array.reduce(function (row, array, index) {
      if (index != 0) {
        row = {}
        row.id = array[0]
        row.cashFlow = array[1]
        row.bill = array[2]
        row.account = array[3]
        row.nomenclature = array[4]
        row.budget = array[5]
        row.fact = array[6]
        row.target = array[7]
        row.color = array[8]
        object.array.push(row)
      }
    }, [])
    object.item = object.array.reduce(function (row, array) {
      if (isMatch(postObject.cardName, array[4]) && isMatch(postObject.cardLabelColor, array[8])) {
        row = array
      }
      return row
    })
    return object
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getAllTarget(postObject) {
  try {
    var array = postObject.targetArray
    var target = getTarget(postObject).item
    var object = {}
    object.item = {}
    object.array = []
    array.reduce(function (row, array, index) {
      if (index != 0) {
        row = {}
        row.timestamp = array[0]
        row.goal = array[1]
        row.cfo = array[2]
        row.startDate = new Date(array[3])
        row.duration = +array[4]
        row.cost = +array[5]
        row.inflation = +array[6]
        row.isIis = +array[7]
        row.restCost = +array[8]
        row.endDate = new Date(array[9])
        row.restDay = +array[10]
        row.complete = array[11]
        row.budget = +array[12]
        row.newCost = +array[13]
        row.monthDeductionSum = +array[14]
        row.currentListedSum = +array[15]
        row.targetSum = +array[17]
        row.depositSum = +array[18]
        row.exchangeSum = +array[19]
        row.iisSum = +array[20]
        row.disbursedFunds = +array[21]
        row.inStock = +array[22]
        row.completePersent = +array[23]
        row.indexRow = index + 1
        object.array.push(row)
      }
    }, [])
    object.item = object.array.reduce(function (row, array) {
      if (isMatch(target.goal, array[1]) && isMatch(target.cfo, array[2])) {
        row = array
      }
      return row
    })
    return object
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

/* eslint-disable no-undef */
function getComment(postObject) {
  try {
    var comment = {}
    var sum = getSum(postObject)
    if (isMatch(postObject.actionType, 'commentCard')) {
      comment.text = '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    } else if (isMatch(postObject.actionType, 'updateComment')) {
      comment.text = '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    } else if (isMatch(postObject.actionType, 'deleteComment')) {
      comment.text = '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    }
    if (postObject.isFact) {
      //* комментарий по факту
      comment.text += '**Остаток средств** ' + '*' + postObject.cfo + '*: ' + sum.totalSum.totalRest + ' р.' + postObject.lineBreak
      comment.text += '**Остаток бюджета**:' + postObject.lineBreak
      comment.text += '*Статья* - ' + postObject.nomenclature + ': ' + sum.totalSum.nomenclatureBudgetRest + ' р.' + postObject.lineBreak
      comment.text += '*Номенклатура* - ' + postObject.account + ': ' + sum.totalSum.accountBudgetRest + ' р.' + postObject.lineBreak
      if (isValidString(postObject.comment)) {
        comment.text += '**Комментарий**: ' + postObject.comment
      }
    } else if (postObject.isBudget) {
      //* комментарий по бюджетуы
      comment.text += '**Бюджет**:' + postObject.lineBreak
      comment.text += '*Номенклатура* - ' + postObject.nomenclature + ': ' + sum.budgetSum.nomenclatureSum + ' р.' + postObject.lineBreak
      comment.text += '*Статья* - ' + postObject.account + ': ' + sum.budgetSum.accountSum + ' р.' + postObject.lineBreak
      comment.text += '*Счет* - ' + postObject.bill + ': ' + sum.budgetSum.billSum + ' р.' + postObject.lineBreak
      if (isValidString(postObject.comment)) {
        comment.text += '**Комментарий**: ' + postObject.comment
      }
    } else if (postObject.isTarget) {
      //* комментарий по цели
      comment.text += '*Счет* - ' + postObject.nomenclature
    }
    return comment
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getCostСenter(postObject) {
  try {
    var array = postObject.costСenterArray
    var object = {}
    object.item = {}
    object.array = []
    array.reduce(function (row, array, index) {
      if (index != 0) {
        row = {}
        row.id = array[0]
        row.mvz = array[1]
        row.tag = array[2]
        object.array.push(row)
      }
    }, [])
    if (isValidString(postObject.comment)) {
      object.item = object.array.reduce(function (row, array) {
        if (isMatch(postObject.comment, array[2])) {
          row = array
        }
        return row
      })
    } else {
      object.item.mvz = postObject.cfo
    }
    return object
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getDescription(postObject) {
  try {
    var description = {}
    var sum = getSum(postObject)
    description.text = '*Дата обновления*: ' + formatterDate(postObject.actionDate).time + postObject.lineBreak
    if (postObject.isFact || postObject.isBudget) {
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
        if (!isMatch(postObject.nomenclature, 'Баланс')) {
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
            description.text += formatterDate(postObject.factPeriod1).date + ' - ' + getPreviousFact(postObject).Prev2.factSum.nomenclatureSum + ' р.' + postObject.lineBreak
          }
        } else if (isMatch(postObject.nomenclature, 'Баланс')) {
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
      if (sum.budgetSum.nomenclatureRows.length != 0 && !isMatch(postObject.nomenclature, 'Баланс')) {
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
    } else if (postObject.isTarget) {
      if (isMatch(postObject.nomenclature, 'Баланс')) {
        var targetItem = getAllTarget(postObject).item
        description.text += 'Перечислено в т.м.: ' + targetItem.currentListedSum + ' р. ' + postObject.lineBreak
        description.text += 'Цели: ' + targetItem.targetSum + ' р. ' + postObject.lineBreak
        description.text += 'Депозит: ' + targetItem.depositSum + ' р. ' + postObject.lineBreak
        description.text += 'Биржа: ' + targetItem.exchangeSum + ' р. ' + postObject.lineBreak
        description.text += 'ИИС: ' + targetItem.iisSum + ' р. ' + postObject.lineBreak
        description.text += 'Освоено: ' + targetItem.disbursedFunds + ' р. ' + postObject.lineBreak
        description.text += 'В наличии: ' + targetItem.inStock + ' р. ' + postObject.lineBreak
        description.text += 'Выполнено: ' + (targetItem.completePersent * 100).toFixed(2) + encodeData('%', '%')
      }
    }
    return description
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getFinancialСenter(postObject) {
  try {
    var array = postObject.financialСenterArray
    var object = {}
    object.item = {}
    object.array = []
    array.reduce(function (row, array, index) {
      if (index != 0) {
        row = {}
        row.id = array[0]
        row.cfo = array[1]
        object.array.push(row)
      }
    }, [])
    object.item = object.array.reduce(function (row, array) {
      if (isMatch(postObject.listName, array[1])) {
        row = array
      }
      return row
    })
    return object
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getParametr(postObject) {
  try {
    var array = post.parametrArray
    var object = {}
    object.item = {}
    object.array = []
    array.reduce(function (row, array, index) {
      if (index != 0) {
        row = {}
        row.id = array[0]
        row.type = array[1]
        row.cfo = array[2]
        row.value = new Date(array[3])
        row.indexRow = index + 1
        object.array.push(row)
      }
    }, [])
    object.item = object.array.reduce(function (row, array) {
      if (isMatch(postObject.cfo, row[2]) && isMatch(postObject.type, row[1])) {
        row = array
      }
      return row
    })
    return object
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getPeriod(postObject) {
  try {
    var postObjectCopy
    var date = {}
    if (postObject.isFact || postObject.isTarget) {
      postObjectCopy = copyObject(postObject)
      postObjectCopy.type = 'Бюджет'
      date.factPeriod = getParametr(postObject).item.value
      date.budgetPeriod = getParametr(postObjectCopy).item.value
      date.factPeriod1 = new Date(date.factPeriod.getFullYear(), date.factPeriod.getMonth() - 1, 1)
      date.factPeriod2 = new Date(date.factPeriod.getFullYear(), date.factPeriod.getMonth() - 2, 1)
      date.budgetPeriod2 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 1, 1)
      date.budgetPeriod3 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 2, 1)
    } else if (postObject.isBudget) {
      postObjectCopy = copyObject(postObject)
      postObjectCopy.type = 'Факт'
      date.factPeriod = getParametr(postObjectCopy).item.value
      date.budgetPeriod = getParametr(postObject).item.value
      date.factPeriod1 = new Date(date.factPeriod.getFullYear(), date.factPeriod.getMonth() - 1, 1)
      date.factPeriod2 = new Date(date.factPeriod.getFullYear(), date.factPeriod.getMonth() - 2, 1)
      date.budgetPeriod2 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 1, 1)
      date.budgetPeriod3 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 2, 1)
    }
    if (isMatch(postObject.boardId, postObject.boardIdFact)) {
      date.period = date.factPeriod
    } else if (isMatch(postObject.boardId, postObject.boardIdFact0)) {
      date.period = date.factPeriod1
    } else if (isMatch(postObject.boardId, postObject.boardIdBudget)) {
      date.period = date.budgetPeriod
    } else if (isMatch(postObject.boardId, postObject.boardIdBudget2)) {
      date.period = date.budgetPeriod2
    } else if (isMatch(postObject.boardId, postObject.boardIdBudget3)) {
      date.period = date.budgetPeriod3
    } else if (isMatch(postObject.boardId, postObject.boardIdTarget)) {
      date.period = date.factPeriod
    }
    date.ymd = getYMD(date.period).ymd
    return date
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getSum(postObject) {
  try {
    var sum = {}
    var totalSum = {}
    var budgetSum = getTotalSum(postObject, postObject.dataAccount.current.budget)
    var factSum = getTotalSum(postObject, postObject.dataAccount.current.fact)
    totalSum.totalRest = factSum.restSum + factSum.incomeSum - factSum.expenseSum
    totalSum.billBudgetRest = budgetSum.billSum - factSum.billSum
    totalSum.accountBudgetRest = budgetSum.accountSum - factSum.accountSum
    totalSum.nomenclatureBudgetRest = budgetSum.nomenclatureSum - factSum.nomenclatureSum
    var transferCoef
    if (isMatch(postObject.cfo, 'Илья')) {
      transferCoef = (70 / 100).toFixed(2)
    } else if (isMatch(postObject.cfo, 'Оксана')) {
      transferCoef = 1
    } else {
      transferCoef = 1
    }
    totalSum.firstTransferToFamilyAccount = ((factSum.restSum + budgetSum.salarySum + budgetSum.accumulationNomenclatureIncomeSum) - (budgetSum.expenseSum - budgetSum.transferToFamilyAccountSum) * transferCoef).toFixed(0)
    if (factSum.nomenclatureSum != 0 && budgetSum.nomenclatureSum != 0) {
      totalSum.nomenclatureBudgetExecution = ((factSum.nomenclatureSum / budgetSum.nomenclatureSum) * 100).toFixed(2)
    } else {
      totalSum.nomenclatureBudgetExecution = 0
    }
    if (factSum.accountSum != 0 && budgetSum.accountSum != 0) {
      totalSum.accountBudgetExecution = ((factSum.accountSum / budgetSum.accountSum) * 100).toFixed(2)
    } else {
      totalSum.accountBudgetExecution = 0
    }
    budgetSum.nomenclatureRows.length != 0 ? totalSum.haveBudget = true : totalSum.haveBudget = false
    sum.budgetSum = budgetSum
    sum.factSum = factSum
    sum.totalSum = totalSum
    return sum
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}



function getTarget(postObject) {
  try {
    var array = postObject.goalsArray
    var object = {}
    object.item = {}
    object.array = []
    array.reduce(function (row, array, index) {
      if (index != 0) {
        row = {}
        row.id = array[0]
        row.listName = array[1]
        row.goal = array[2]
        row.cfo = array[3]
        row.listId = array[5]
        row.status = array[6]
        row.indexRow = index + 1
        object.array.push(row)
      }
    }, [])
    object.item = object.array.reduce(function (row, array) {
      if (isMatch(postObject.listName, array[1])) {
        row = array
      }
      return row
    })
    return object
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getTotalSum(postObject, array) {
  /*
   * @array - массив данных для расчета сумм
   */
  try {
    var total = {}
    //* сумма по операции
    total.cashFlowSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, postObject.cashFlow)) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по счету
    total.billSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.bill, postObject.bill) && isMatch(array.cashFlow, postObject.cashFlow)) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье
    total.accountSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.bill, postObject.bill) && isMatch(array.account, postObject.account) && isMatch(array.cashFlow, postObject.cashFlow)) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре
    total.nomenclatureSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.bill, postObject.bill) && isMatch(array.account, postObject.account) && isMatch(array.nomenclature, postObject.nomenclature) && isMatch(array.cashFlow, postObject.cashFlow)) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции пополнение
    total.incomeSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Пополнение')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции списание
    total.expenseSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Списание')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции остатки
    total.restSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Остатки')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье затраты
    total.costSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Списание') && isMatch(array.bill, 'Затраты')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в расходах
    total.accumulationBillExpenseSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Списание') && isMatch(array.bill, 'Накопления')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье переводы в расходах
    total.transferBillExpenseSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Списание') && isMatch(array.bill, 'Переводы')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в приходах
    total.accumulationBillIncomeSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Пополнение') && isMatch(array.bill, 'Накопления')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в приходах
    total.accumulationNomenclatureIncomeSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Пополнение') && isMatch(array.nomenclature, 'Накопления')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в расходах
    total.accumulationNomenclatureExpenseSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Списание') && isMatch(array.nomenclature, 'Накопления')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по переводу на счет семьи
    total.transferToFamilyAccountSum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Списание') && isMatch(array.nomenclature, 'Перевод на счет Семья')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по зарплате
    total.salarySum = array.reduce(function (sum, array) {
      if (isMatch(array.cfo, postObject.cfo) && isMatch(array.cashFlow, 'Пополнение') && isMatch(array.nomenclature, 'Зарплата')) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* данные по статьям с агрегацией
    var groupAccount = array.reduce(function (newArray, array) {
      if (isMatch(array.cfo, postObject.cfo)) {
        if (!newArray[array.account]) {
          newArray[array.account] = {}
          newArray[array.account].bill = array.bill
          newArray[array.account].account = array.account
          newArray[array.account].sum = 0
        }
        newArray[array.account].sum += array.sum
      }
      return newArray
    }, {})
    total.groupAccount = Object.keys(groupAccount).map(function (k) {
      var item = groupAccount[k]
      return {
        bill: item.bill,
        account: item.account,
        sum: item.sum
      }
    })
    total.groupAccount.sort(function (a, b) {
      var nameA = a.bill.toLowerCase()
      var nameB = b.bill.toLowerCase()
      if (nameA < nameB) // сортируем строки по возрастанию
        return -1
      if (nameA > nameB)
        return 1
      return 0 // Никакой сортировки
    })
    //* данные по счету с агрегацией
    var groupBill = array.reduce(function (newArray, array) {
      if (isMatch(array.cfo, postObject.cfo)) {
        if (!newArray[array.bill]) {
          newArray[array.bill] = {}
          newArray[array.bill].bill = array.bill
          newArray[array.bill].sum = 0
        }
        newArray[array.bill].sum += array.sum
      }
      return newArray
    }, {})
    total.groupBill = Object.keys(groupBill).map(function (k) {
      var item = groupBill[k]
      return {
        bill: item.bill,
        sum: item.sum
      }
    })
    //* данные из учета
    total.nomenclatureRows = array.filter(function (array) {
      return isMatch(array.cfo, postObject.cfo) && isMatch(array.bill, postObject.bill) && isMatch(array.account, postObject.account) && isMatch(array.nomenclature, postObject.nomenclature) && isMatch(array.cashFlow, postObject.cashFlow)
    })
    return total
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function isOldData(postObject) {
  try {
    //* добавление строк на страницу
    var targetArray = postObject.dataTrello.all
    var searchRow = targetArray.reduce(function (row, array) {
      if (isMatch(array.actionId, postObject.actionId)) {
        row = true
      }
      return row
    }, false)
    return searchRow
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function parseComment(postObject) {
  try {
    var parseData = {}
    var text = postObject.text
    parseData.sum = +text.match(/^\d+/)
    parseData.comment = text.split(parseData.sum).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
    return parseData
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function updateBalanceCard(postObject) {
  /*
   * @postObject - данные реквеста
   * @sumData - данные по суммам из учета
   */
  try {
    //* обновление карточки баланса
    var postObjectBalance = copyObject(postObject)
    postObjectBalance.nomenclature = 'Баланс'
    var balanceCard = getCards(postObjectBalance, postObjectBalance.listId).item
    postObjectBalance.cardId = balanceCard.id
    addCardComment(postObjectBalance)
    if (postObjectBalance.isBudget || postObjectBalance.isTarget) {
      var description = getDescription(postObjectBalance)
      postObjectBalance.cardDescription = description.text
      updateCardDesc(postObjectBalance)
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function updateDescForNewCards(postObject) {
  try {
    var cards = getCards(postObject).array
    var postObjectCard = copyObject(postObject)
    postObjectCard.dataAccount = getAllData(postObjectCard, 'account')
    //* обновление описание карточки
    cards.forEach(function (card) {
      postObjectCard.cardId = card.id
      postObjectCard.cardName = card.name
      postObjectCard.cardLabelColor = getCardLabel(postObjectCard).item.color
      postObjectCard.accountingItem = getAccountingItem(postObjectCard)
      postObjectCard.cashFlow = postObjectCard.accountingItem.item.cashFlow
      postObjectCard.bill = postObjectCard.accountingItem.item.bill
      postObjectCard.account = postObjectCard.accountingItem.item.account
      postObjectCard.nomenclature = card.name
      //? разобатся с получение описания и сумм
      var description = getDescription(postObjectCard)
      if (description.haveBudget) {
        postObjectCard.cardDescription = description.text
        updateCardDesc(postObjectCard)
      }
    })
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}


function updateParametr(postObject) {
  /*
   * обновление параметра
   * @postObject - входные параметра запроса
   * @value - значение параметра. Изменяемое
   * */
  try {
    var ss = postObject.parametrSheetOpen
    var indexRow
    var value
    var postObjectCopy = copyObject(postObject)
    if (postObject.isCurrFact) {
      postObjectCopy.type = 'Факт'
      indexRow = getParametr(postObjectCopy).item.indexRow
      value = new Date(postObjectCopy.factPeriod.getFullYear(), postObjectCopy.factPeriod.getMonth() + 1, 1)
      ss.getRange(indexRow, 4).setValue(formatterDate(value).date)
      ss.getRange(indexRow, 5).setValue(formatterDate().timestamp)
    } else if (postObject.isCurrBudget) {
      postObjectCopy.isFact = false
      postObjectCopy.isBudget = true
      postObjectCopy.type = 'Бюджет'
      indexRow = getParametr(postObjectCopy).item.indexRow
      value = new Date(postObjectCopy.budgetPeriod.getFullYear(), postObjectCopy.budgetPeriod.getMonth() + 1, 1)
      ss.getRange(indexRow, 4).setValue(formatterDate(value).date)
      ss.getRange(indexRow, 5).setValue(formatterDate().timestamp)
    }
    postObject.parametrArray = getGoogleSheetValues(postObject.parametrSheetOpen)
    postObject.date = getPeriod(postObject)
    postObject.period = postObject.date.period
    postObject.ymd = postObject.date.ymd
    postObject.factPeriod1 = postObject.date.factPeriod1
    postObject.factPeriod = postObject.date.factPeriod
    postObject.budgetPeriod = postObject.date.budgetPeriod
    postObject.budgetPeriod2 = postObject.date.budgetPeriod2
    postObject.budgetPeriod3 = postObject.date.budgetPeriod3
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function updateRowByActionId(postObject) {
  /*
   * @postObject - данные реквеста
   * */
  try {
    var ss
    var sourceData
    var sourceRows
    var ts
    var targetData
    var targetRowIndex = []
    //* обновление данных на листе источнике
    ss = postObject.trelloOpen
    sourceData = postObject.dataTrello.all
    sourceRows = sourceData.filter(function (row) {
      return row.actionId == postObject.actionId
    })
    sourceRows.forEach(function (row) {
      ss.getRange(row.indexRow, 1).setValue(postObject.actionDate)
      ss.getRange(row.indexRow, 6).setValue(postObject.sum)
      ss.getRange(row.indexRow, 7).setValue(postObject.comment)
    })
    //* обновление данных на листе учета
    ts = postObject.accountOpen
    targetData = postObject.accountArray
    targetData.reduce(function (row, array, index) {
      if (isMatch(array[10], postObject.actionId)) {
        row = index + 1
        targetRowIndex.push(row)
      }
      return row
    }, [])
    targetRowIndex.forEach(function (row) {
      ts.getRange(row, 1).setValue(postObject.actionDate)
      ts.getRange(row, 9).setValue(postObject.sum)
      ts.getRange(row, 10).setValue(postObject.comment)
    })
    //* обновление данных в массиве учета
    targetData.map(function (array) {
      if (isMatch(array[10], postObject.actionId)) {
        array[0] = postObject.actionDate
        array[8] = postObject.sum
        array[9] = postObject.comment
      }
    })
    //* получение текущих данных после обновления
    postObject.dataAccount = getAllData(postObject, 'account')
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

// обновление параметра
function updateTarget(postObject) {
  /*
   * @postObject - входные параметра запроса
   * @value - значение параметра. Изменяемое
   * */
  try {
    var ss = postObject.goalsSheetOpen
    var indexRow
    indexRow = getTarget(postObject).item.indexRow
    ss.getRange(indexRow, 5).setValue(formatterDate().timestamp)
    ss.getRange(indexRow, 7).setValue('closed')
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function updateTrelloData(postObject) {
  try {
    var pushBufferRow
    var pushAccountRow
    var insertdate
    //* вставка значений в буфер
    var ss = postObject.trelloOpen
    pushBufferRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, postObject.type]
    ss.appendRow(pushBufferRow)
    //* вставка значений в учет
    var ts = postObject.accountOpen
    var targetArray = postObject.accountArray
    pushAccountRow = [postObject.actionDate, postObject.period, postObject.cfo, postObject.mvz, postObject.cashFlow, postObject.bill, postObject.account, postObject.nomenclature, postObject.sum, postObject.comment, postObject.actionId, postObject.type]
    ts.appendRow(pushAccountRow)
    targetArray.push(pushAccountRow)
    //* Проверка перевода на счет семьи
    if (isMatch(postObject.account, 'Перевод на счет Семья')) {
      insertdate = new Date(postObject.actionDate.getTime() + 1000);
      if (isMatch(postObject.cfo, 'Илья')) {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Илья', 'Приход со счета Илья', postObject.sum, postObject.comment, postObject.actionId, postObject.type]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
      } else if (isMatch(postObject.cfo, 'Оксана')) {
        pushAccountRow = [insertdate, postObject.period, 'Семья', 'Семья', 'Пополнение', 'Переводы', 'Приход со счета Оксана', 'Приход со счета Оксана', postObject.sum, postObject.comment, postObject.actionId, postObject.type]
        ts.appendRow(pushAccountRow)
        targetArray.push(pushAccountRow)
      }
    }
    //* получение данных учета после обновления
    postObject.dataAccount = getAllData(postObject, 'account')
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function updateTargetList(postObject) {
  try {
    var targetItem = getAllTarget(postObject).item
    var ssTargetOpen = postObject.targetOpen
    var targetColumn
    var targetSumOld
    var targetSumNew
    var actionSum
    if (isMatch(postObject.bill, 'Накопления')) {
      if (isMatch(postObject.account, 'Цели')) {
        targetColumn = 18
        targetSumOld = targetItem.targetSum
      } else if (isMatch(postObject.account, 'Депозит')) {
        targetColumn = 19
        targetSumOld = targetItem.depositSum
      } else if (isMatch(postObject.account, 'Биржа')) {
        targetColumn = 20
        targetSumOld = targetItem.exchangeSum
      } else if (isMatch(postObject.account, 'ИИС')) {
        targetColumn = 21
        targetSumOld = targetItem.iisSum
      }
      //? продумать как определять цель при списании в затраты
    } else if (isMatch(postObject.bill, 'Затраты')) {
      if (isMatch(targetItem.goal, postObject.mvz)) {
        targetColumn = 22
        targetSumOld = targetItem.disbursedFunds
      }
    }
    if (isMatch(postObject.actionType, 'commentCard')) {
      actionSum = postObject.sum
    } else if (isMatch(postObject.actionType, 'deleteComment')) {
      actionSum = -1 * postObject.sum
    } else if (isMatch(postObject.actionType, 'updateComment')) {
      actionSum = postObject.sum - postObject.oldSum
    }
    if (isMatch(postObject.cashFlow, 'Списание')) {
      targetSumNew = targetSumOld + actionSum
    } else if (isMatch(postObject.cashFlow, 'Пополнение')) {
      targetSumNew = targetSumOld - actionSum
    }
    ssTargetOpen.getRange(targetItem.indexRow, targetColumn).setValue(+targetSumNew)
    postObject.targetArray = getGoogleSheetValues(postObject.targetOpen)
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getAllData(postObject, source) {
  /*
   * @source - истоник: trello, account
   */
  try {
    var dataStructure
    var data
    if (isMatch(source, 'trello')) {
      dataStructure = 1
      data = postObject.trelloArray
    } else if (isMatch(source, 'account')) {
      dataStructure = 2
      data = postObject.accountArray
    }
    var object = {}
    object.all = []
    object.current = {}
    data.reduce(function (row, array, index) {
      if (index != 0) {
        row = {}
        if ([1].indexOf(dataStructure) !== -1) {
          //* данные из буфера трелло
          row.actionDate = array[0]
          row.period = array[1]
          row.ymd = getYMD(array[1]).ymd
          row.cfo = array[2]
          row.mvz = array[3]
          row.cashFlow = null
          row.bill = null
          row.account = null
          row.nomenclature = array[4]
          row.sum = array[5]
          row.comment = array[6]
          row.actionId = array[7]
          row.type = array[8]
          row.indexRow = index + 1
        } else if ([2].indexOf(dataStructure) !== -1) {
          //* данные из учета
          row.actionDate = array[0]
          row.period = array[1]
          row.ymd = getYMD(row.period).ymd
          row.cfo = array[2]
          row.mvz = array[3]
          row.cashFlow = array[4]
          row.bill = array[5]
          row.account = array[6]
          row.nomenclature = array[7]
          row.sum = array[8]
          row.comment = array[9]
          row.actionId = array[10]
          row.type = array[11]
          row.indexRow = index + 1
        }
        object.all.push(row)
      }
    }, [])
    object.current.fact = object.all.filter(function (row) {
      return row.ymd == getYMD(postObject.factPeriod).ymd && isMatch(row.type, 'Факт')
    })
    object.current.budget = object.all.filter(function (row) {
      return row.ymd == getYMD(postObject.budgetPeriod).ymd && isMatch(row.type, 'Бюджет')
    })
    return object
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getPreviousFact(postObject) {
  try {
    var sum = {}
    var postObjectPrev1 = copyObject(postObject)
    postObjectPrev1.factPeriod = postObject.factPeriod1
    postObjectPrev1.dataAccount = getAllData(postObjectPrev1, 'account')
    sum.Prev1 = getSum(postObjectPrev1)
    var postObjectPrev2 = copyObject(postObject)
    postObjectPrev2.factPeriod = postObject.factPeriod2
    postObjectPrev2.dataAccount = getAllData(postObjectPrev2, 'account')
    sum.Prev2 = getSum(postObjectPrev2)
    return sum
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function isUser(postData) {
  try {
    let botUser = ['5e2b5f3f409c544ebdb1b9d4']
    let isUser = botUser.reduce(function (row, array) {
      if (isMatch(array, postData.action.memberCreator.id)) {
        row = false
      }
      return row
    }, true)
    return isUser
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function isValidateAction(postData) {
  try {
    let actionType = ['commentCard', 'updateComment', 'deleteComment', 'createList', 'updateList', 'updateCard']
    let isValidateAction = actionType.reduce(function (row, array) {
      if (isMatch(postData.action.type, array)) {
        row = true
      }
      return row
    }, false)
    return isValidateAction
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}

function doPost(e) {
  try {
    var postData = JSON.parse(e.postData.contents)
    var isNewAction = addLog(postData)
    addErrorItem('1 ' + postData)
    if (isValidateAction(postData) && !isUser(postData) && isNewAction) {
      var postObject = getPostObject(postData)
      addErrorItem('4 ' + postObject)
      if (isMatch(postObject.actionType, 'commentCard')) {
        //* добавление информации
        updateTrelloData(postObject)
        if (postObject.isTarget) {
          //* обновление листа цель
          updateTargetList(postObject)
        }
        //* получение описание карточки и комментария
        postObject.cardDescription = getDescription(postObject).text
        postObject.cardComment = getComment(postObject).text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
        //* добавление реакции на комментарий
        addCardReaction(postObject)
      } else if (isMatch(postObject.actionType, 'updateComment') && postObject.isOldData) {
        //* обновление данных при изменении комментария
        updateRowByActionId(postObject)
        if (postObject.isTarget) {
          //* обновление листа цель
          updateTargetList(postObject)
        }
        postObject.cardDescription = getDescription(postObject).text
        postObject.cardComment = getComment(postObject).text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
        addCardReaction(postObject)
      } else if (isMatch(postObject.actionType, 'deleteComment') && postObject.isOldData) {
        //* удаление строки при удалении комментария
        postObject.sum = deleteRowByActionId(postObject)
        if (postObject.isTarget) {
          //* обновление листа цель
          updateTargetList(postObject)
        }
        postObject.cardDescription = getDescription(postObject).text
        postObject.cardComment = getComment(postObject).text
        //* обновление описание карточки
        updateCardDesc(postObject)
        //* обновление карточки баланса
        updateBalanceCard(postObject)
      } else if (isMatch(postObject.actionType, 'createList')) {
        if (postObject.isFact || postObject.isBudget) {
          addFinancialCenter(postObject)
          postObject.cfo = postObject.listName
          if (postObject.isFact) {
            postObject.type = 'Факт'
          } else if (postObject.isBudget) {
            postObject.type = 'Бюджет'
          }
          createCardsForList(postObject)
          updateDescForNewCards(postObject)
        } else if (postObject.isTarget) {
          addTarget(postObject)
          createCardsForList(postObject)
        }
      } else if (isMatch(postObject.actionType, 'updateList')) {
        if (postObject.isTarget && postObject.listClosed) {
          updateTarget(postObject)
        }
      } else if (isMatch(postObject.actionType, 'updateCard')) {
        if (postObject.cardClosed && isMatch(postObject.cardName, 'Баланс')) {
          if (postObject.isCurrFact) {
            //* закрытие фактического периода
            updateParametr(postObject)
            closedFactPeriod(postObject)
            updateDescForNewCards(postObject)
          } else if (postObject.isCurrBudget) {
            //* закрытие бюджетного периода
            updateParametr(postObject)
            closedBudgetPeriod(postObject)
          }
        }
      }
    }
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  } finally {
    //* запись ошибок
    addErrorArray(postObject)
    //* удаление старых логов
    deleteLog(postObject)
    //* удаление старых ошибок
    deleteError(postObject)
    //* Удаление пустых строк
    deleteEmptyRow(postObject)
  }
}