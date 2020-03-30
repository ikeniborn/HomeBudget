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
    if (goal == undefined) {
      var newId = goalArray.length + 1
      ss.appendRow([newId, postObject.listName, newGoal, cfo, formatterDate().timestamp, postObject.listId, 'actual'])
      postObject.goalsArray = getGoogleSheetValues(postObject.goalsSheetOpen)
    }
  } catch (e) {
    console.error('addFinancialCenter: ' + e)
  }
}