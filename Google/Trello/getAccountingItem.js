// получаение справочника статей
function getAccountingItem(postObject) {
  try {
    var array = postObject.accountingItemArray
    var account = {}
    account.item = {}
    account.array = []
    array.reduce(function (row, array, index) {
      if (index > 0) {
        if (array[4].toUpperCase().trim() == postObject.cardName.toUpperCase().trim() && array[8].toUpperCase().trim() == postObject.cardLabelColor.toUpperCase().trim()) {
          row = {}
          row.id = array[0]
          row.cashFlow = array[1]
          row.bill = array[2]
          row.account = array[3]
          row.nomenclature = array[4]
          row.budget = array[5]
          row.fact = array[6]
          row.target = array[7]
          row.color = array[8]
          account.item = row
          account.array.push(row)
        } else {
          row = {}
          row.id = array[0]
          row.cashFlow = array[1]
          row.bill = array[2]
          row.account = array[3]
          row.nomenclature = array[4]
          row.budget = array[5]
          row.fact = array[6]
          row.target = array[7]
          row.color = array[8]
          account.array.push(row)
        }
      }
    }, {})
    return account
  } catch (e) {
    console.error('getAccountingItem: ' + e)
  }
}