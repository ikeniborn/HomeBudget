function getAllData(postObject, source) {
  /*
   * @source - истоник: buffer, account
   */
  var dataStructure
  var data
  if (source == 'trello') {
    dataStructure = 1
    data = postObject.sourceSheetNameTrelloArray
  } else if (source == 'account') {
    dataStructure = 2
    data = postObject.targetSheetNameAccountArray
  }
  var sourceArray = {}
  sourceArray.all = []
  sourceArray.allCurr = []
  sourceArray.fact = []
  sourceArray.factCurr = []
  sourceArray.budget = []
  sourceArray.budgetCurr = []
  data.reduce(function (row, array, index) {
    if (index > 0) {
      row = {}
      if ([1].indexOf(dataStructure) !== -1) {
        //* данные из буфера трелло
        row.actionDate = array[0]
        row.period = array[1]
        row.ymd = getYMD(array[1]).ymd
        row.cfo = array[2]
        row.mvz = null
        row.cashFlow = null
        row.bill = null
        row.account = null
        row.nomenclature = array[3]
        row.sum = array[4]
        row.comment = array[5]
        row.actionId = array[6]
        row.source = array[7]
        row.indexRow = index + 1
      } else if ([2].indexOf(dataStructure) !== -1) {
        //* данные из учета
        row.actionDate = array[0]
        row.period = array[1]
        row.ymd = getYMD(row.period).ymd
        row.cfo = array[2]
        row.mvz = array[3]
        row.cashFlow = array[4]
        row.bill = array[5]
        row.account = array[6]
        row.nomenclature = array[7]
        row.sum = array[8]
        row.comment = array[9]
        row.actionId = array[10]
        row.source = array[11]
        row.indexRow = index + 1
      }
      sourceArray.all.push(row)
      if (row.ymd == postObject.ymd) {
        sourceArray.allCurr.push(row)
      }
      if (row.source == 'Факт') {
        sourceArray.fact.push(row)
        if (row.ymd == postObject.ymd) {
          sourceArray.factCurr.push(row)
        }
      } else if (row.source == 'Бюджет') {
        sourceArray.budget.push(row)
        if (row.ymd == postObject.ymd) {
          sourceArray.budgetCurr.push(row)
        }
      }
    }
  }, [])
  return sourceArray
}