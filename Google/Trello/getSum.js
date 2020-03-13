/* eslint-disable no-undef */
function getSum(postObject) {
  try {
    var sum = {}
    var budgetSum = getTotalSum(postObject, 'account', 'budget')
    var factSum = getTotalSum(postObject, 'account', 'fact')
    if (postObject.isFact) {
      sum = factSum
      sum.totalRest = factSum.incomeSum + factSum.restSum - factSum.expenseSum
      sum.nomenclatureBudgetRows = budgetSum.nomenclatureBudgetRows
      sum.groupAccount = budgetSum.groupAccount
    } else if (postObject.isBudget) {
      sum = budgetSum
      sum.restSum = factSum.restSum
    }
    sum.billBudgetRest = budgetSum.billSum - factSum.billSum
    sum.accountBudgetRest = budgetSum.accountSum - factSum.accountSum
    sum.nomenclatureBudgetRest = budgetSum.nomenclatureSum - factSum.nomenclatureSum
    var transferCoef
    if (postObject.cfo == 'Илья') {
      transferCoef = (70 / 100).toFixed(2)
    } else if (postObject.cfo == 'Оксана') {
      transferCoef = 0
    } else {
      transferCoef = 0
    }
    sum.firstTransferToFamilyAccount = (sum.restSum + sum.salarySum + sum.accumulationNomenclatureIncomeSum) - (sum.expenseSum - sum.transferToFamilyAccountSum) * transferCoef
    if (factSum.nomenclatureSum != 0 && budgetSum.nomenclatureSum != 0) {
      sum.nomenclatureBudgetExecution = ((factSum.nomenclatureSum / budgetSum.nomenclatureSum) * 100).toFixed(2)
    } else {
      sum.nomenclatureBudgetExecution = 0
    }
    if (factSum.accountSum != 0 && budgetSum.accountSum != 0) {
      sum.accountBudgetExecution = ((factSum.accountSum / budgetSum.accountSum) * 100).toFixed(2)
    } else {
      sum.accountBudgetExecution = 0
    }
    budgetSum.nomenclatureSum !== 0 ? sum.haveBudget = true : sum.haveBudget = false
    return sum
  } catch (e) {
    console.error('getSum: ' + e)
  }
}