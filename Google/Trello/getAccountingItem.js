// получаение справочника статей
function getAccountingItem(postObject) {
  try {
    var array = postObject.accountingItemArray
    var account = {}
    account.item = {}
    account.array = []
    array.reduce(function (row, array) {
      if (array[4].toUpperCase().trim() == postObject.cardName.toUpperCase().trim() && array[10].toUpperCase().trim() == postObject.cardLabelColor.toUpperCase().trim()) {
        row = {}
        row.id = array[0]
        row.cashFlow = array[1]
        row.bill = array[2]
        row.account = array[3]
        row.nomenclature = array[4]
        row.form = array[5]
        row.budget = array[6]
        row.fact = array[7]
        row.target = array[8]
        row.billNew = array[9]
        row.color = array[10]
        row.useDesc = array[11]
        account.item = row
        account.array.push(row)
      } else {
        row = {}
        row.id = array[0]
        row.cashFlow = array[1]
        row.bill = array[2]
        row.account = array[3]
        row.nomenclature = array[4]
        row.form = array[5]
        row.budget = array[6]
        row.fact = array[7]
        row.target = array[8]
        row.billNew = array[9]
        row.color = array[10]
        row.useDesc = array[11]
        account.array.push(row)
      }
    }, {})
    return account
  } catch (e) {
    console.error('getAccountingItem: ' + e)
  }
}