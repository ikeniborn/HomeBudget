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
      ssParametr.appendRow([newIdParametr, 'Факт', postObject.listName, period, formatterDate().timestamp])
      ssParametr.appendRow([newIdParametr + 1, 'Бюджет', postObject.listName, period, formatterDate().timestamp])
      ssParametr.appendRow([newIdParametr + 2, 'Цель', postObject.listName, period, formatterDate().timestamp])
      //* обновление листа
      postObject.listName = postObject.listName + ' ' + formatterDate(period).date
      updateList(postObject)
    }
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}