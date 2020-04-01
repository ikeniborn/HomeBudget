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
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}