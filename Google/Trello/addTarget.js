// обновление параметра
function addTarget(postObject) {
  /*
   * @postObject - входные параметра запроса
   * */
  try {
    var ss = postObject.goalsSheetOpen
    var array = getTarget(postObject).array
    var goal = getTarget(postObject).item.name
    var cfo = getFinancialСenter(postObject).item.cfo
    var objCfo = postObject.listName.toLowerCase().match(cfo.toLowerCase())
    var newGoal = postObject.listName.replace(objCfo, '').trim()
    var goalArray = array.map(function (array) {
      return array.name
    })
    if (goal == undefined) {
      var newId = goalArray.length + 1
      ss.appendRow([newId, newGoal, cfo, formatterDate().timestamp])
      postObject.goalsArray = getValues(postObject.goalsSheetOpen)
    }
    //* обновление листа
    updateList(postObject, postObject.listId, newGoal)
  } catch (e) {
    console.error('addFinancialCenter: ' + e)
  }
}