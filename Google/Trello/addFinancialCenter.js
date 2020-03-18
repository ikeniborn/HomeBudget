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
    var cfo = getFinancialСenter(postObject).item.cfo
    if (cfo == undefined) {
      var newId = cfoArray.length + 1
      ss.appendRow([newId, postObject.listName, formatterDate().timestamp])
    }
  } catch (e) {
    console.error('addFinancialCenter: ' + e)
  }
}