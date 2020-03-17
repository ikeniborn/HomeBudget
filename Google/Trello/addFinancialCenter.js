// обновление параметра
function addFinancialCenter(postObject) {
  /*
   * @postObject - входные параметра запроса
   * */
  try {
    var ss = postObject.costСenterSheetOpen
    var ssArray = postObject.costСenterArray
    var newId = ssArray.reduce(function (row, index) {
      row = index + 1
      return row
    })
    ss.appendRow([newId, postObject.cfo, formatterDate().timestamp])
  } catch (e) {
    console.error('addFinancialCenter: ' + e)
  }
}