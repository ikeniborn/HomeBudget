function getAllData(postObject, source, type) {
  /*
   * @source - истоник: buffer, account
   * @type - тип данных: fact, budget, target
   */
  var dataStructure
  var data
  if (source == 'buffer' && type == 'fact') {
    dataStructure = 1
    data = postObject.sourceSheetNameFactTrelloArray
  } else if (source == 'buffer' && type == 'budget') {
    dataStructure = 1
    data = postObject.sourceSheetNameBudgetTrelloArray
  } else if (source == 'account' && type == 'fact') {
    dataStructure = 2
    data = postObject.targetSheetNameFactArray
  } else if (source == 'account' && type == 'budget') {
    dataStructure = 2
    data = postObject.targetSheetNameBudgetArray
  } else if (source == 'buffer' && type == 'target') {
    dataStructure = 3
    data = postObject.sourceSheetNameTargetTrelloArray
  } else if (source == 'account' && type == 'target') {
    dataStructure = 3
    data = postObject.targetSheetNameTargetArray
  }
  var sourceArray = []
  var accountingItemArrya = postObject.accountingItem.arrya
  var getNewBill = function (nomenclature) {
    var row = accountingItemArrya.filter(function (row) {
      return row.nomenclature == nomenclature
    })
    return row.billNew
  }
  data.reduce(function (row, array, index) {
    if (index == 0) {} else {
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
        row.billNew = null
        row.account = null
        row.nomenclature = array[3]
        row.sum = array[4]
        row.comment = array[5]
        row.actionId = array[6]
        row.sourceList = null
        row.indexRow = index + 1
      } else if ([2].indexOf(dataStructure) !== -1) {
        //* данные из учета
        row.actionDate = array[0]
        row.period = array[1]
        row.ymd = getYMD(array[1]).ymd
        row.cfo = array[2]
        row.mvz = array[3]
        row.cashFlow = null
        row.bill = array[4]
        row.billNew = getNewBill(array[6])
        row.account = array[5]
        row.nomenclature = array[6]
        row.sum = array[7]
        row.comment = array[8]
        row.actionId = array[9]
        row.sourceList = array[10]
        row.indexRow = index + 1
      } else if ([4].indexOf(dataStructure) !== -1) {
        //* данные из буфера гуглформ
        row.actionDate = array[0]
        row.period = array[1]
        row.ymd = getYMD(array[1]).ymd
        row.cfo = array[2]
        row.mvz = array[3]
        row.cashFlow = null
        row.bill = array[4]
        row.billNew = getNewBill(array[6])
        row.account = array[5]
        row.nomenclature = array[6]
        row.sum = array[7]
        row.comment = array[8]
        row.actionId = null
        row.sourceList = null
        row.indexRow = index + 1
      }
      return sourceArray.push(row)
    }
  }, [])
  return sourceArray
}