function getTotalSum(sheetID, sheetName, уmd, cfo, bill, account, nomenclature) {
  /*
    SheetID - идентификатор страницы гугл
    SheetName - наименование листа страницы
    уmd - период в формате yyyymmdd
    cfo - наименование цфо
    bill - наименование счета
    account - наименование стать
    nomenclature - наименование номенклатуры
   */
  // перепесать редьюс через вложенную функцию
  var allDataFact = filterDataFromArray(getAllData(sheetID, sheetName), уmd)
  var billSum = 0
  var accountSum = 0
  var nomenclatureSum = 0
  var reducers = {
    bill: function (state, item) {
      if (item.cfo == cfo && item.bill == bill) {
        billSum += item.sum
      }
      return billSum
    },
    account: function (state, item) {
      if (item.cfo == cfo && item.bill == bill && item.account == account) {
        accountSum += item.sum
      }
      return accountSum
    },
    nomenclature: function (state, item) {
      if (item.cfo == cfo && item.bill == bill && item.account == account && item.nomenclature == nomenclature) {
        nomenclatureSum += item.sum
      }
      return nomenclatureSum
    }
  }

  var combineReducers = function (reducers) {
    return function (state, item) {
      return Object.keys(reducers).reduce(function (nextState, key) {
        return reducers[key](state, item)
      }, {})
    }
  };

  var totalReducer = combineReducers(reducers);

  var total = allDataFact.reduce(totalReducer, {
    billSum: 0,
    accountSum: 0,
    nomenclatureSum: 0
  })

  return total
}