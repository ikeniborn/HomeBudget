function getAllTarget(postObject) {
  try {
    var array = postObject.targetArray
    var target = getTarget(postObject).item
    var obj = {}
    obj.item = {}
    obj.array = []
    array.reduce(function (row, array, index) {
      if (index > 0) {
        if (target.goal == array[1] && target.cfo == array[2]) {
          row = {}
          row.timestamp = array[0]
          row.goal = array[1]
          row.cfo = array[2]
          row.startDate = new Date(array[3])
          row.duration = +array[4]
          row.cost = +array[5]
          row.inflation = +array[6]
          row.isIis = +array[7]
          row.restCost = +array[8]
          row.endDate = new Date(array[9])
          row.restDay = +array[10]
          row.complete = array[11]
          row.budget = +array[12]
          row.newCost = +array[13]
          row.monthDeductionSum = +array[14]
          row.currentListedSum = +array[15]
          row.targetSum = +array[17]
          row.depositSum = +array[18]
          row.exchangeSum = +array[19]
          row.iisSum = +array[20]
          row.indexRow = index + 1
          obj.item = row
          obj.array.push(row)
        } else {
          row = {}
          row.timestamp = array[0]
          row.goal = array[1]
          row.cfo = array[2]
          row.startDate = new Date(array[3])
          row.duration = +array[4]
          row.cost = +array[5]
          row.inflation = +array[6]
          row.isIis = +array[7]
          row.restCost = +array[8]
          row.endDate = new Date(array[9])
          row.restDay = +array[10]
          row.complete = array[11]
          row.budget = +array[12]
          row.newCost = +array[13]
          row.monthDeductionSum = +array[14]
          row.currentListedSum = +array[15]
          row.targetSum = +array[17]
          row.depositSum = +array[18]
          row.exchangeSum = +array[19]
          row.iisSum = +array[20]
          row.indexRow = index + 1
          obj.array.push(row)
        }
      }
    }, {})
    return obj
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}