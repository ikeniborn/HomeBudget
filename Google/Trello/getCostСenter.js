function getCostСenter(postObject) {
  try {
    var array = postObject.costСenterArray
    var account = {}
    account.item = {}
    account.array = []
    array.reduce(function (row, array) {
      if (array[4] == postObject.cardName) {
        row = {}
        row.id = array[0]
        row.tag = array[1]
        row.mvz = array[2]
        account.item = row
        account.array.push(row)
      } else {
        row = {}
        row.id = array[0]
        row.tag = array[1]
        row.mvz = array[2]
        account.array.push(row)
      }
    }, {})
    return account
  } catch (e) {
    console.error('getCostСenter: ' + e)
  }
}