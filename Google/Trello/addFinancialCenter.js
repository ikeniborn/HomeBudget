// обновление параметра
function addFinancialCenter(postObject) {
  /*
   * @postObject - входные параметра запроса
   * */
  try {
    var ss = postObject.financialCenterSheetOpen
    var array = getFinancialСenter(postObject).array
    var cfoArray = array.map(function (array) {
      return array.cfo
    })
    // var cfo = getFinancialСenter(postObject).item.cfo
    if (postObject.cfo == undefined) {
      var newId = cfoArray.length + 1
      ss.appendRow([newId, postObject.listName, formatterDate().timestamp])
    }
    //* обновление листа
    var listName = postObject.listName + ' ' + formatterDate(postObject.period).date
    updateList(postObject, postObject.listId, listName)
  } catch (e) {
    console.error('addFinancialCenter: ' + e)
  }
}