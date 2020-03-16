function getFinancialСenter(postObject) {
  try {
    var array = postObject.financialСenterArray
    var listName = postObject.listName
    var cfo = {}
    cfo.item = {}
    cfo.array = []
    array.reduce(function (row, array, index) {
      if (index > 0) {
        if (listName.toLowerCase().match(array[1].toLowerCase())) {
          row = {}
          row.id = array[0]
          row.cfo = array[1]
          cfo.item = row
          cfo.array.push(row)
        } else {
          row = {}
          row.id = array[0]
          row.cfo = array[1]
          cfo.array.push(row)
        }
      }
    }, {})
    return cfo
  } catch (e) {
    console.error('getFinancialСenter: ' + e)
  }
}