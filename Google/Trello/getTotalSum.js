function getTotalSum(postObject, source, type) {
  /*
   * @source - истоник: buffer, account
   * @type - тип данных: fact, budget, target
   */
  try {
    var currData = getCurrData(getAllData(postObject, source, type), postObject.ymd)
    var total = {}
    //* сумма по счету
    total.billSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье
    total.accountSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре
    total.nomenclatureSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье приход
    total.incomeSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Приход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье расход
    total.expenseSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Расход') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье остатки
    total.restSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Остатки') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье затраты
    total.costSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.Расход == 'Расход' && array.billNew == 'Затраты') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в расходах
    total.accumulationBillExpenseSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.Расход == 'Расход' && array.billNew == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в приходах
    total.accumulationBillIncomeSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.Расход == 'Приход' && array.billNew == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в приходах
    total.accumulationNomenclatureIncomeSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.Расход == 'Приход' && array.nomenclature == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в приходах
    total.accumulationNomenclatureExpenseSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.Расход == 'Приход' && array.nomenclature == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по переводу на счет семьи
    total.transferToFamilyAccountSum = currData.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.Расход == 'Расход' && array.nomenclature == 'Перевод на счет Семьи') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* суммы по бюджету
    if (type == 'budget') {
      //* данные по статьям с агрегацией
      var groupAccount = currData.reduce(function (newArray, array) {
        if (array.cfo == postObject.cfo) {
          if (!newArray[array.account]) {
            newArray[array.account] = {}
            newArray[array.account].bill = array.bill
            newArray[array.account].account = array.account
            newArray[array.account].sum = 0
          }
          newArray[array.account].sum += array.sum
        }
        return newArray
      }, {})
      total.groupAccount = Object.keys(groupAccount).map(function (k) {
        const item = groupAccount[k]
        return {
          bill: item.bill,
          account: item.account,
          sum: item.sum
        }
      })
      total.groupAccount.sort(function (a, b) {
        var nameA = a.bill.toLowerCase()
        var nameB = b.bill.toLowerCase()
        if (nameA < nameB) // сортируем строки по возрастанию
          return -1
        if (nameA > nameB)
          return 1
        return 0 // Никакой сортировки
      })
      //* данные по счету с агрегацией
      var groupBill = currData.reduce(function (newArray, array) {
        if (array.cfo == postObject.cfo) {
          if (!newArray[array.bill]) {
            newArray[array.bill] = {}
            newArray[array.bill].bill = array.bill
            newArray[array.bill].sum = 0
          }
          newArray[array.bill].sum += array.sum
        }
        return newArray
      }, {})
      total.groupBill = Object.keys(groupBill).map(function (k) {
        const item = groupBill[k]
        return {
          bill: item.bill,
          sum: item.sum
        }
      })
      //* данные из учета
      total.nomenclatureBudgetRows = currData.filter(function (array) {
        return array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature
      })
    }
    return total
  } catch (e) {
    console.error('getTotalSum: ' + e)
  }
}