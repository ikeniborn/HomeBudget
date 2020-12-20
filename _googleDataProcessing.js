function getParametr() {
  try {
    const object = getGlobalVariable()
    const trelloOpen = openGoogleSheet(object.sourceSheetID, object.sourceSheetNameTrello)
    const accountOpen = openGoogleSheet(object.targetSheetID, object.targetSheetNameAccount)
    const currentDate = new Date()
    const currentPeriod = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const previousPeriod = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1)
    const data = getGoogleSheetValues(trelloOpen)
    const filterdata = data.reduce(function (row, array, index) {
      if (index != 0) {
        const object = {}
        //* данные из буфера трелло
        object.actionDate = array[0]
        object.period = array[1]
        object.cfo = array[2]
        object.mvz = array[3]
        object.cashFlow = array[4]
        object.bill = array[5]
        object.account = array[6]
        object.nomenclature = array[7]
        object.sum = array[8]
        object.comment = array[9]
        object.actionId = array[10]
        object.type = array[11]
        object.indexRow = index + 1
        if ((isMatch(object.type, 'Факт') && object.period >= previousPeriod && object.period <= currentPeriod) || (isMatch(object.type, 'Бюджет') && object.period == currentPeriod)) {
          row.push(object)
        }
      }
      return row
    }, [])
    const ssMaxRows = accountOpen.getMaxRows()
    accountOpen.deleteRows(2, ssMaxRows - 2)
    accountOpen.setValues(filterdata)
  } catch (e) {
    addErrorItem(arguments.callee.name + ': ' + e)
  }
}