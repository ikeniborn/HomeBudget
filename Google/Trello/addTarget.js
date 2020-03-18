// обновление параметра
function addTarget(postObject) {
  /*
   * @postObject - входные параметра запроса
   * */
  try {
    var ss = postObject.goalsSheetOpen
    var array = getTarget(postObject).array
    var cfoArray = array.map(function (array) {
      return array.name
    })
    if (cfoArray.indexOf(postObject.listName) === -1) {
      var newId = cfoArray.length + 1
      ss.appendRow([newId, postObject.listName, '', formatterDate().timestamp])
    }
  } catch (e) {
    console.error('addFinancialCenter: ' + e)
  }
}