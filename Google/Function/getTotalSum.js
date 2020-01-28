function getTotalSum(SheetID, SheetName, уmd, cfo, bill, account, nomenclature) {
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
  var ssData = SpreadsheetApp.openById(SheetID).getSheetByName(SheetName)
  var allDataFact = ssData.getDataRange().getValues()
  // var total = {}
  // var totalBill = 0
  // var totalAccount = 0
  // var totalNomenclature = 0
  // получение суммы по счету
  // allDataFact.reduce(function (row, array) {
  //   var ymdRow = getYMD(array[1]).ymd
  //   if (ymdRow == уmd && array[2] == cfo && array[4] == bill) {
  //     totalBill += array[7]
  //     if (array[5] == account) {
  //       totalAccount += array[7]
  //       if (array[6] == nomenclature) {
  //         totalNomenclature += array[7]
  //       }
  //     }
  //     row.push(array)
  //   }
  //   return row
  // }, [])
  // total.bill = totalBill
  // total.account = totalAccount
  // total.nomenclature = totalNomenclature
  // var total = allDataFact.reduce(function (row, array) {
  //     return function (array) {
  //       var ymdRow = getYMD(array[1]).ymd
  //       if (ymdRow == уmd && array[2] == cfo && array[4] == bill) {
  //         totalBill += array[7]
  //         if (array[5] == account) {
  //           totalAccount += array[7]
  //           if (array[6] == nomenclature) {
  //             totalNomenclature += array[7]
  //           }
  //         }
  //       }
  //       return {
  //         bill: totalBill,
  //         account: totalAccount,
  //         nomenclature: totalNomenclature
  //       }
  //     }
  //   }

  var reducers = {
    bill: function (state, item) {

      return state.bill += item.array[7]
    },
    account: function (state, item) {
      return state.account += item.array[7]
    },
    nomenclature: function (state, item) {
      return state.nomenclature += item.array[7]
    }
  };

  var combineReducers = function (reducers) {
    return function (state, item) {
      return Object.keys(reducers).reduce(function (nextState, key) {
        return reducers[key](state, item)
      }, {})
    }
  };

  var totalReducer = combineReducers(reducers);

  var total = allDataFact.reduce(totalReducer, {
    bill: 0,
    account: 0,
    nomenclature: 0
  })

  return total
}