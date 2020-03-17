function getTotalSum(postObject, array) {
  /*
   * @array - массив данных для расчета сумм
   */
  try {
    var total = {}
    //* сумма по операции
    total.cashFlowSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == postObject.cashFlow) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по счету
    total.billSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье
    total.accountSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре
    total.nomenclatureSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature) {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции пополнение
    total.incomeSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Пополнение') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по операции списание
    total.expenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье остатки
    total.restSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.bill == 'Остатки') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье затраты
    total.costSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.bill == 'Затраты') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в расходах
    total.accumulationBillExpenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.bill == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье переводы в расходах
    total.transferBillExpenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.bill == 'Переводы') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по статье накопления в приходах
    total.accumulationBillIncomeSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Пополнение' && array.bill == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в приходах
    total.accumulationNomenclatureIncomeSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.nomenclature == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по номенклатуре накопления в расходах
    total.accumulationNomenclatureExpenseSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.nomenclature == 'Накопления') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по переводу на счет семьи
    total.transferToFamilyAccountSum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Списание' && array.nomenclature == 'Перевод на счет Семья') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* сумма по зарплате
    total.salarySum = array.reduce(function (sum, array) {
      if (array.cfo == postObject.cfo && array.cashFlow == 'Пополнение' && array.nomenclature == 'Зарплата') {
        sum += array.sum
      }
      return sum
    }, 0)
    //* суммы по бюджету
    if (type == 'budget') {
      //* данные по статьям с агрегацией
      var groupAccount = array.reduce(function (newArray, array) {
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
      var groupBill = array.reduce(function (newArray, array) {
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
      total.nomenclatureBudgetRows = array.filter(function (array) {
        return array.cfo == postObject.cfo && array.bill == postObject.bill && array.account == postObject.account && array.nomenclature == postObject.nomenclature
      })
    }
    return total
  } catch (e) {
    console.error('getTotalSum: ' + e)
  }
}