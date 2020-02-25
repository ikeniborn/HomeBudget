function isNewData(globalVar, postObject) {
  try {
    var sheetName
    if ([globalVar.boardIdFact, globalVar.boardIdFact0].indexOf(postObject.boardId) !== -1) {
      sheetName = globalVar.sourceSheetNameFactTrello
    } else if ([globalVar.boardIdBudget, globalVar.boardIdBudget2, globalVar.boardIdBudget3].indexOf(postObject.boardId) !== -1) {
      sheetName = globalVar.sourceSheetNameBudgetTrello
    }
    //* добавление строк на страницу
    var targetArray = getAllData(globalVar, globalVar.sourceSheetID, sheetName)
    var searchRow = targetArray.filter(function (row) {
      return row.actionId == postObject.actionId
    })
    if (searchRow.length == 0) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.error('isNewData: ' + e)
  } finally {
    console.log('isNewData: complete ')
  }

}