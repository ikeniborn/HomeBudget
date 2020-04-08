/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
function addLog(postData) {
  try {
    var globalVariable = getGlobalVariable()
    var sourceOpen = openGoogleSheet(globalVariable.sourceSheetID, globalVariable.sourceSheetNameLog)
    var startDate = getPreviousDate(180)
    var sourceArray = getGoogleSheetValues(sourceOpen).reduce(function (row, array, index) {
      if (index > 0) {
        if (array[0] >= startDate) {
          row.push(array)
        }
      }
      return row
    }, [])
    var isNewAction = sourceArray.reduce(function (row, array) {
      if (array[2].match(postData.action.id)) {
        row = false
      }
      return row
    }, true)
    if (isNewAction) {
      sourceOpen.appendRow([formatterDate().timestamp, postData.action.type, postData.action.id])
    }
    return isNewAction
  } catch (e) {
    let postObject = getGlobalVariable()
    let error = arguments.callee.name + ': ' + e
    errorOpen = openGoogleSheet(postObject.sourceSheetID, postObject.sourceSheetNameError)
    errorOpen.appendRow([formatterDate().timestamp, postData.action.type, postData.action.id, '', '', '', error])
  }
}

function deleteLog(postObject) {
  try {
    var globalVariable = getGlobalVariable()
    var sourceOpen = openGoogleSheet(globalVariable.sourceSheetID, globalVariable.sourceSheetNameLog)
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
      let startDeleteIndex = deleteArrya.reduce(function (a, b) {
        return a < b ? a : b
      })
      let countDeleteRow = deleteArrya.reduce(function (a, b) {
        return a > b ? a : b
      })
      sourceOpen.deleteRows(startDeleteIndex, countDeleteRow)
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }

}

function addError(postObject) {
  try {
    if (postObject.error.length > 0) {
      let globalVariable = getGlobalVariable()
      errorOpen = openGoogleSheet(globalVariable.sourceSheetID, globalVariable.sourceSheetNameError)
      var error = ''
      let i = 0
      postObject.error.map(function (row) {
        i += 1
        error += row + postObject.error.length == i ? '' : '\n'
        return row
      })
      errorOpen.appendRow([postObject.webHookDate, postObject.actionType, postObject.webHookActionId, postObject.actionId, postObject.boardId, postObject.listId, error])
    }
  } catch (e) {
    error = arguments.callee.name + ': ' + e
    errorOpen.appendRow([postObject.webHookDate, postObject.actionType, postObject.webHookActionId, postObject.actionId, postObject.boardId, postObject.listId, error])
  }
}

function deleteError(postObject) {
  try {
    const errorOpen = postObject.errorOpen
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
      let startDeleteIndex = deleteArrya.reduce(function (a, b) {
        return a < b ? a : b
      })
      let countDeleteRow = deleteArrya.reduce(function (a, b) {
        return a > b ? a : b
      })
      errorOpen.deleteRows(startDeleteIndex, countDeleteRow)
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function openGoogleSheet(sheetID, sheetName) {
  try {
    // открытие листа
    return SpreadsheetApp.openById(sheetID).getSheetByName(sheetName)
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getGoogleSheetValues(openSheet) {
  try {
    return openSheet.getDataRange().getValues()
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getPostObject(postData) {
  try {
    var postObject = getGlobalVariable()
    postObject.webHookDate = formatterDate().timestamp
    postObject.actionType = postData.action.type
    postObject.webHookActionId = postData.action.id
    // открытие листов
    postObject.financialCenterSheetOpen = openGoogleSheet(postObject.sourceSheetID, postObject.financialCenterSheetName)
    postObject.accountingItemSheetOpen = openGoogleSheet(postObject.sourceSheetID, postObject.accountingItemSheetName)
    postObject.costСenterSheetOpen = openGoogleSheet(postObject.sourceSheetID, postObject.costСenterSheetName)
    postObject.parametrSheetOpen = openGoogleSheet(postObject.sourceSheetID, postObject.parametrSheetName)
    postObject.goalsSheetOpen = openGoogleSheet(postObject.sourceSheetID, postObject.goalsSheetName)
    postObject.trelloOpen = openGoogleSheet(postObject.sourceSheetID, postObject.sourceSheetNameTrello)
    postObject.errorOpen = openGoogleSheet(postObject.sourceSheetID, postObject.sourceSheetNameError)
    postObject.accountOpen = openGoogleSheet(postObject.targetSheetID, postObject.targetSheetNameAccount)
    postObject.targetOpen = openGoogleSheet(postObject.targetSheetID, postObject.targetSheetNameTarget)
    // данные с листов
    postObject.financialСenterArray = getGoogleSheetValues(postObject.financialCenterSheetOpen)
    postObject.accountingItemArray = getGoogleSheetValues(postObject.accountingItemSheetOpen)
    postObject.costСenterArray = getGoogleSheetValues(postObject.costСenterSheetOpen)
    postObject.parametrArray = getGoogleSheetValues(postObject.parametrSheetOpen)
    postObject.goalsArray = getGoogleSheetValues(postObject.goalsSheetOpen)
    postObject.trelloArray = getGoogleSheetValues(postObject.trelloOpen)
    postObject.errorArray = getGoogleSheetValues(postObject.errorOpen)
    postObject.accountArray = getGoogleSheetValues(postObject.accountOpen)
    postObject.targetArray = getGoogleSheetValues(postObject.targetOpen)
    if (['updateComment', 'deleteComment'].indexOf(postData.action.type) !== -1) {
      postObject.actionId = postData.action.data.action.id
    } else {
      postObject.actionId = postData.action.id
    }
    postObject.actionDate = new Date(postData.action.date)
    postObject.memberId = postData.action.memberCreator.id
    postObject.memberUsername = postData.action.memberCreator.username
    postObject.boardId = postData.action.data.board.id
    postObject.boardName = postData.action.data.board.name
    if ([postObject.boardIdFact, postObject.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      postObject.isFact = true
      if ([postObject.boardIdFact].indexOf(postObject.boardId) !== -1) {
        postObject.isCurrFact = true
      } else {
        postObject.isCurrFact = false
      }
      postObject.isBudget = false
      postObject.isCurrBudget = false
      postObject.isTarget = false
      postObject.type = 'Факт'
    } else if ([postObject.boardIdBudget, postObject.boardIdBudget2, postObject.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      postObject.isFact = false
      postObject.isCurrFact = false
      postObject.isBudget = true
      if ([postObject.boardIdBudget].indexOf(postObject.boardId) !== -1) {
        postObject.isCurrBudget = true
      } else {
        postObject.isCurrBudget = false
      }
      postObject.isTarget = false
      postObject.type = 'Бюджет'
    } else if ([postObject.boardIdTarget].indexOf(postObject.boardId) !== -1) {
      postObject.isFact = false
      postObject.isCurrFact = false
      postObject.isBudget = false
      postObject.isCurrBudget = false
      postObject.isTarget = true
      postObject.type = 'Факт'
    }
    if (['deleteComment', 'updateComment', 'commentCard', 'updateCard'].indexOf(postData.action.type) !== -1) {
      postObject.cardId = postData.action.data.card.id
      postObject.cardName = postData.action.data.card.name
      postObject.cardDescription = ''
      postObject.cardComment = ''
      postObject.cardLabelColor = getCardLabel(postObject).item.color
    }
    if (['commentCard', 'createList', 'updateList', 'updateCard'].indexOf(postData.action.type) !== -1) {
      postObject.list = {}
      postObject.listId = postData.action.data.list.id
      postObject.listName = postData.action.data.list.name
      if (['updateList'].indexOf(postData.action.type) !== -1) {
        postObject.listClosed = postData.action.data.list.closed
      }
      if (['updateCard'].indexOf(postData.action.type) !== -1) {
        postObject.cardClosed = postData.action.data.card.closed
      }
    } else if (['updateComment', 'deleteComment'].indexOf(postData.action.type) !== -1) {
      postObject.list = getCardList(postObject)
      postObject.listId = postObject.list.id
      postObject.listName = postObject.list.name
    }
    if (postObject.isTarget) {
      postObject.cfo = getTarget(postObject).item.cfo
    } else {
      postObject.cfo = getFinancialСenter(postObject).item.cfo
    }
    if (['Илья', 'Оксана'].indexOf(postObject.cfo) !== -1) {
      postObject.privateBudget = true
    } else {
      postObject.privateBudget = false
    }
    if (['deleteComment', 'updateComment', 'commentCard', 'updateCard'].indexOf(postData.action.type) !== -1) {
      postObject.accountingItem = getAccountingItem(postObject)
      postObject.cashFlow = postObject.accountingItem.item.cashFlow
      postObject.bill = postObject.accountingItem.item.bill
      postObject.account = postObject.accountingItem.item.account
      postObject.nomenclature = postData.action.data.card.name
      if (['updateComment', 'commentCard'].indexOf(postData.action.type) !== -1) {
        if (['updateComment'].indexOf(postData.action.type) !== -1) {
          postObject.text = postData.action.data.action.text
        } else {
          postObject.text = postData.action.data.text
        }
        postObject.parseText = parseComment(postObject)
        postObject.sum = postObject.parseText.sum
        if (['updateComment'].indexOf(postData.action.type) !== -1) {
          var postObjectOld = copyObject(postObject)
          postObjectOld.text = postData.action.data.old.text
          postObject.oldSum = parseComment(postObjectOld).sum
        }
        postObject.comment = postObject.parseText.comment
        if (postObject.isTarget) {
          postObject.mvz = getTarget(postObject).item.goal
        } else {
          postObject.mvz = getCostСenter(postObject).item.mvz
        }
      }
    }
    if (['createList', 'updateList'].indexOf(postData.action.type) !== -1) {
      var currDate = new Date
      postObject.period = new Date(currDate.getFullYear(), currDate.getMonth(), 1)
      postObject.ymd = getYMD(postObject.period)
      postObject.factPeriod0 = new Date(postObject.period.getFullYear(), postObject.period.getMonth() - 1, 1)
      postObject.factPeriod = postObject.period
      postObject.budgetPeriod = new Date(postObject.period.getFullYear(), postObject.period.getMonth() + 1, 1)
      postObject.budgetPeriod2 = new Date(postObject.period.getFullYear(), postObject.period.getMonth() + 2, 1)
      postObject.budgetPeriod3 = new Date(postObject.period.getFullYear(), postObject.period.getMonth() + 3, 1)
    } else {
      postObject.date = getPeriod(postObject)
      postObject.period = postObject.date.period
      postObject.ymd = postObject.date.ymd
      postObject.factPeriod0 = postObject.date.factPeriod0
      postObject.factPeriod = postObject.date.factPeriod
      postObject.budgetPeriod = postObject.date.budgetPeriod
      postObject.budgetPeriod2 = postObject.date.budgetPeriod2
      postObject.budgetPeriod3 = postObject.date.budgetPeriod3
    }
    if (['deleteComment', 'updateComment', 'commentCard'].indexOf(postData.action.type) !== -1) {
      postObject.dataTrello = getAllData(postObject, 'trello')
    }
    if (['deleteComment', 'updateComment'].indexOf(postData.action.type) !== -1) {
      postObject.isOldData = isOldData(postObject)
    } else {
      postObject.isOldData = false
    }
    return postObject
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
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
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

// обновление параметра
function addFinancialCenter(postObject) {
  /*
   * @postObject - входные параметра запроса
   * */
  try {
    var ss = postObject.financialCenterSheetOpen
    var ssParametr = postObject.parametrSheetOpen
    var array = getFinancialСenter(postObject).array
    var arrayPаrametr = getParametr(postObject).array
    var cfoArray = array.map(function (array) {
      return array.id
    })
    var parametrArray = arrayPаrametr.map(function (array) {
      return array.id
    })
    if (postObject.cfo == undefined) {
      var newId = cfoArray.length + 1
      ss.appendRow([newId, postObject.listName, formatterDate().timestamp])
      postObject.financialСenterArray = getGoogleSheetValues(postObject.financialCenterSheetOpen)
      var newIdParametr = parametrArray.length + 1
      ssParametr.appendRow([newIdParametr, 'Факт', postObject.listName, postObject.factPeriod, formatterDate().timestamp])
      ssParametr.appendRow([newIdParametr + 1, 'Бюджет', postObject.listName, postObject.budgetPeriod, formatterDate().timestamp])
    }
    //* обновление листа
    postObject.listName = postObject.listName + ' ' + formatterDate(postObject.period).date
    updateList(postObject)
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
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

/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedBudgetPeriod(postObject) {
  try {
    const postObjectBudget = copyObject(postObject)
    postObjectBudget.boardId = postObjectBudget.boardIdBudget
    postObjectBudget.listId = getList(postObjectBudget).id
    postObjectBudget.listName = postObjectBudget.cfo + ' ' + formatterDate(postObjectBudget.budgetPeriod).date
    archiveAllCards(postObjectBudget)
    updateList(postObjectBudget)
    const postObjectBudget2 = copyObject(postObjectBudget)
    postObjectBudget2.boardId = postObjectBudget2.boardIdBudget2
    postObjectBudget2.listId = getList(postObjectBudget2).id
    postObjectBudget2.listName = postObjectBudget2.cfo + ' ' + formatterDate(postObjectBudget2.budgetPeriod2).date
    moveAllCards(postObjectBudget2, postObjectBudget)
    updateList(postObjectBudget2)
    const postObjectBudget3 = copyObject(postObjectBudget2)
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

/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
function closedFactPeriod(postObject) {
  try {
    const postObjectFact0 = copyObject(postObject)
    postObjectFact0.boardId = postObjectFact0.boardIdFact0
    postObjectFact0.listId = getList(postObjectFact0).id
    postObjectFact0.listName = postObjectFact0.cfo + ' ' + formatterDate(postObjectFact0.factPeriod0).date
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

/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
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
        if (arrya.color.toUpperCase() == accounts.color.toUpperCase()) {
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
      if (array.actionId == postObject.actionId) {
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
      if (array[10] == postObject.actionId) {
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

function encodeData(data, symbol) {
  try {
    var encodeSymbol = encodeURIComponent(symbol)
    var encodeData = encodeURIComponent(data)
    if (encodeData.match(encodeSymbol)) {
      return data.replace(symbol, encodeURIComponent(symbol))
    } else {
      return data
    }
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
    const formatter = {}
    formatter.date = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy')
    formatter.time = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy HH:mm')
    formatter.timestamp = Utilities.formatDate(new Date(date), 'GMT+3', 'dd.MM.yyyy HH:mm:ss')
    return formatter
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
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
    var account = {}
    account.item = {}
    account.array = []
    array.reduce(function (row, array, index) {
      if (array[4].toUpperCase().trim() == postObject.cardName.toUpperCase().trim() && array[8].toUpperCase().trim() == postObject.cardLabelColor.toUpperCase().trim()) {
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
        account.item = row
        account.array.push(row)
      } else if (index > 0) {
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
        account.array.push(row)
      }
    }, {})
    return account
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getAllTarget(postObject) {
  try {
    var array = postObject.targetArray
    var target = getTarget(postObject).item
    var obj = {}
    obj.item = {}
    obj.array = []
    array.reduce(function (row, array, index) {
      if (target.goal == array[1] && target.cfo == array[2]) {
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
        row.indexRow = index + 1
        obj.item = row
        obj.array.push(row)
      } else if (index > 0) {
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
        row.indexRow = index + 1
        obj.array.push(row)
      }
    }, {})
    return obj
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

/* eslint-disable no-undef */
function getComment(postObject) {
  try {
    var comment = {}
    var sum = getSum(postObject)
    if (postObject.actionType == 'commentCard') {
      comment.text = '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    } else if (postObject.actionType == 'updateComment') {
      comment.text = '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
    } else if (postObject.actionType == 'deleteComment') {
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
    }
    return comment
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getCostСenter(postObject) {
  try {
    var array = postObject.costСenterArray
    var text = postObject.comment
    var mvz = {}
    mvz.item = {}
    mvz.array = []
    if (Object.prototype.toString.call(postObject.comment) == '[object String]') {
      array.reduce(function (row, array, index) {
        if (text.toLowerCase().replace(/\s+/g, '').trim().match(array[2].toLowerCase())) {
          row = {}
          row.id = array[0]
          row.mvz = array[1]
          row.tag = array[2]
          mvz.item = row
          mvz.array.push(row)
        } else if (index > 0) {
          row = {}
          row.id = array[0]
          row.mvz = array[1]
          row.tag = array[2]
          mvz.array.push(row)
        }
      }, {})
    }
    if (mvz.item.mvz == undefined) {
      mvz.item.mvz = postObject.cfo
    }
    return mvz
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

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
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getFinancialСenter(postObject) {
  try {
    var array = postObject.financialСenterArray
    var listName = postObject.listName
    var cfo = {}
    cfo.item = {}
    cfo.array = []
    array.reduce(function (row, array, index) {
      if (listName.toLowerCase().match(array[1].toLowerCase())) {
        row = {}
        row.id = array[0]
        row.cfo = array[1]
        cfo.item = row
        cfo.array.push(row)
      } else if (index > 0) {
        row = {}
        row.id = array[0]
        row.cfo = array[1]
        cfo.array.push(row)
      }
    }, {})
    return cfo
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}


function getParametr(postObject) {
  try {
    var array = postObject.parametrArray
    var parametr = {}
    parametr.item = {}
    parametr.array = []
    array.reduce(function (row, array, index) {
      if (postObject.cfo == array[2] && array[1] == postObject.type) {
        row = {}
        row.id = array[0]
        row.type = array[1]
        row.cfo = array[2]
        row.value = new Date(array[3])
        row.indexRow = index + 1
        parametr.item = row
        parametr.array.push(row)
      } else if (index > 0) {
        row = {}
        row.id = array[0]
        row.type = array[1]
        row.cfo = array[2]
        row.value = new Date(array[3])
        row.indexRow = index + 1
        parametr.array.push(row)
      }
    }, {})
    return parametr
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
      date.factPeriod0 = new Date(date.factPeriod.getFullYear(), date.factPeriod.getMonth() - 1, 1)
      date.budgetPeriod2 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 1, 1)
      date.budgetPeriod3 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 2, 1)
    } else if (postObject.isBudget) {
      postObjectCopy = copyObject(postObject)
      postObjectCopy.type = 'Факт'
      date.factPeriod = getParametr(postObjectCopy).item.value
      date.budgetPeriod = getParametr(postObject).item.value
      date.factPeriod0 = new Date(date.factPeriod.getFullYear(), date.factPeriod.getMonth() - 1, 1)
      date.budgetPeriod2 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 1, 1)
      date.budgetPeriod3 = new Date(date.budgetPeriod.getFullYear(), date.budgetPeriod.getMonth() + 2, 1)
    }
    if (postObject.boardId == postObject.boardIdFact) {
      date.period = date.factPeriod
    } else if (postObject.boardId == postObject.boardIdFact0) {
      date.period = date.factPeriod0
    } else if (postObject.boardId == postObject.boardIdBudget) {
      date.period = date.budgetPeriod
    } else if (postObject.boardId == postObject.boardIdBudget2) {
      date.period = date.budgetPeriod2
    } else if (postObject.boardId == postObject.boardIdBudget3) {
      date.period = date.budgetPeriod3
    } else if (postObject.boardId == postObject.boardIdTarget) {
      date.period = date.factPeriod
    }
    date.ymd = getYMD(date.period).ymd
    return date
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}


// Get date before some day from now. n - day
function getPreviousDate(n) {
  try {
    /*
     * n - количество дней
     */
    var endDate = new Date()
    var startDate = new Date()
    startDate.setDate(endDate.getDate() - n)
    return startDate
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

/* eslint-disable no-undef */
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
    if (postObject.cfo == 'Илья') {
      transferCoef = (70 / 100).toFixed(2)
    } else if (postObject.cfo == 'Оксана') {
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
    var listName = postObject.listName
    var obj = {}
    obj.item = {}
    obj.array = []
    array.reduce(function (row, array, index) {
      if (index > 0) {
        if (listName.toLowerCase().match(array[1].toLowerCase())) {
          row = {}
          row.id = array[0]
          row.listName = array[1]
          row.goal = array[2]
          row.cfo = array[3]
          row.listId = array[5]
          row.status = array[6]
          row.indexRow = index + 1
          obj.item = row
          obj.array.push(row)
        } else {
          row = {}
          row.id = array[0]
          row.listName = array[1]
          row.goal = array[2]
          row.cfo = array[3]
          row.listId = array[5]
          row.status = array[6]
          row.indexRow = index + 1
          obj.array.push(row)
        }
      }
    }, {})
    return obj
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
      if (array.cfo == postObject.cfo && array.cashFlow == postObject.cashFlow) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по счету
    total.billSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.cashFlow == postObject.cashFlow) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье
    total.accountSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.cashFlow == postObject.cashFlow) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре
    total.nomenclatureSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature && array.cashFlow == postObject.cashFlow) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции пополнение
    total.incomeSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Пополнение') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции списание
    total.expenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции остатки
    total.restSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Остатки') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье затраты
    total.costSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.bill == 'Затраты') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в расходах
    total.accumulationBillExpenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.bill == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье переводы в расходах
    total.transferBillExpenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.bill == 'Переводы') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в приходах
    total.accumulationBillIncomeSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Пополнение' && array.bill == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в приходах
    total.accumulationNomenclatureIncomeSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Пополнение' && array.nomenclature == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в расходах
    total.accumulationNomenclatureExpenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.nomenclature == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по переводу на счет семьи
    total.transferToFamilyAccountSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.nomenclature == 'Перевод на счет Семья') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по зарплате
    total.salarySum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Пополнение' && array.nomenclature == 'Зарплата') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* данные по статьям с агрегацией
    var groupAccount = array.reduce(function (newArray, array) {
      if (array.cfo == postObject.cfo) {
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
      const item = groupAccount[k]
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
      if (array.cfo == postObject.cfo) {
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
      const item = groupBill[k]
      return {
        bill: item.bill,
        sum: item.sum
      }
    })
    //* данные из учета
    total.nomenclatureRows = array.filter(function (array) {
      return array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature && array.cashFlow == postObject.cashFlow
    })
    return total
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getYMD(date) {
  try {
    var y = new Date(date).getFullYear()
    var m = new Date(date).getMonth() + 1
    var d = new Date(date).getDate()
    return {
      y: y,
      m: m,
      d: d,
      ymd: y.toString() + m.toString() + d.toString()
    }
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function isOldData(postObject) {
  try {
    //* добавление строк на страницу
    var targetArray = postObject.dataTrello.all
    var searchRow = targetArray.reduce(function (row, array) {
      if (array.actionId.match(postObject.actionId)) {
        row = true
      }
      return row
    }, false)
    return searchRow
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function isValidDate(d) {
  try {
    if (Object.prototype.toString.call(d) !== '[object Date]')
      return false;
    return !isNaN(d.getTime())
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function isValidString(d) {
  try {
    if (Object.prototype.toString.call(d) !== '[object String]')
      return false
    return d
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function parseComment(postObject) {
  try {
    const parseData = {}
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
    if (postObjectBalance.isBudget) {
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
    const postObjectCopy = copyObject(postObject)
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
    postObject.factPeriod0 = postObject.date.factPeriod0
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
      if (array[10] == postObject.actionId) {
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
      if (array[10] == postObject.actionId) {
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
    if (postObject.bill == 'Накопления') {
      if (postObject.account == 'Цели') {
        targetColumn = 18
        targetSumOld = targetItem.targetSum
      } else if (postObject.account == 'Депозит') {
        targetColumn = 19
        targetSumOld = targetItem.depositSum
      } else if (postObject.account == 'Биржа') {
        targetColumn = 20
        targetSumOld = targetItem.exchangeSum
      } else if (postObject.account == 'ИИС') {
        targetColumn = 21
        targetSumOld = targetItem.iisSum
      }
      //? продумать как определять цель при списании в затраты
    } else if (postObject.bill == 'Затраты') {
      if (targetItem.goal == postObject.mvz) {
        targetColumn = 22
        targetSumOld = targetItem.disbursedFunds
      }
    }
    if (postObject.actionType == 'commentCard') {
      actionSum = postObject.sum
    } else if (postObject.actionType == 'deleteComment') {
      actionSum = -1 * postObject.sum
    } else if (postObject.actionType == 'updateComment') {
      actionSum = postObject.sum - postObject.oldSum
    }
    if (postObject.cashFlow == 'Списание') {
      targetSumNew = targetSumOld + actionSum
    } else if (postObject.cashFlow == 'Пополнение') {
      targetSumNew = targetSumOld - actionSum
    }
    ssTargetOpen.getRange(targetItem.indexRow, targetColumn).setValue(+targetSumNew)
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
    if (source == 'trello') {
      dataStructure = 1
      data = postObject.trelloArray
    } else if (source == 'account') {
      dataStructure = 2
      data = postObject.accountArray
    }
    var sourceArray = {}
    sourceArray.all = []
    sourceArray.current = {}
    data.reduce(function (row, array, index) {
      if (index > 0) {
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
        sourceArray.all.push(row)
      }
    }, [])
    sourceArray.current.fact = sourceArray.all.filter(function (row) {
      return row.ymd == postObject.ymd && row.type == 'Факт'
    })
    sourceArray.current.budget = sourceArray.all.filter(function (row) {
      return row.ymd == postObject.ymd && row.type == 'Бюджет'
    })
    return sourceArray
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function getPreviousFact(postObject) {
  try {
    var sum = {}
    const postObjectPrev1 = copyObject(postObject)
    postObjectPrev1.period = postObject.factPeriod
    postObjectPrev1.ymd = getYMD(postObjectPrev1.period).ymd
    postObjectPrev1.dataAccount = getAllData(postObjectPrev1, 'account')
    sum.Prev1 = getSum(postObjectPrev1)
    const postObjectPrev2 = copyObject(postObject)
    postObjectPrev2.period = postObject.factPeriod0
    postObjectPrev2.ymd = getYMD(postObjectPrev2.period).ymd
    postObjectPrev2.dataAccount = getAllData(postObjectPrev2, 'account')
    sum.Prev2 = getSum(postObjectPrev2)
    return sum
  } catch (e) {
    postObject.error.push(arguments.callee.name + ': ' + e)
  }
}

function doPost(e) {
  try {
    const parseAction = ['commentCard', 'updateComment', 'deleteComment', 'createList', 'updateList', 'updateCard']
    const botUser = ['5e2b5f3f409c544ebdb1b9d4']
    var postData = JSON.parse(e.postData.contents)
    // if (['updateCard'].indexOf(postData.action.type) !== -1) {
    //   let postObject = getPostObject(postData)
    //   let errorOpen = openGoogleSheet(postObject.sourceSheetID, postObject.sourceSheetNameError)
    //   errorOpen.appendRow([formatterDate().timestamp, postData.action.type, postData.action.id, '', '', '', JSON.parse(JSON.stringify(postObject))])
    // }
    if (parseAction.indexOf(postData.action.type) !== -1 && botUser.indexOf(postData.action.memberCreator.id) === -1 && addLog(postData)) {
      var postObject = getPostObject(postData)
      if (postObject.actionType == 'commentCard') {
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
      } else if (postObject.actionType == 'updateComment' && postObject.isOldData) {
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
      } else if (postObject.actionType == 'deleteComment' && postObject.isOldData) {
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
      } else if (postObject.actionType == 'createList') {
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
      } else if (postObject.actionType == 'updateList') {
        if (postObject.isTarget && postObject.listClosed) {
          updateTarget(postObject)
        }
      } else if (postObject.actionType == 'updateCard') {
        if (postObject.cardClosed && postObject.cardName == 'Баланс') {
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
    postObject.error.push(arguments.callee.name + ': ' + e)
  } finally {
    //* запись ошибок
    addError(postObject)
    //* удаление старых логов
    deleteLog(postObject)
    //* удаление старых ошибок
    deleteError(postObject)
    //* Удаление пустых строк
    deleteEmptyRow(postObject)
  }
}