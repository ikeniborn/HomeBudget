/* eslint-disable no-undef */
function getSum(postObject) {
  try {
    var sum = {}
    var totalSum = {}
    var budgetSum = getTotalSum(postObject, postObject.dataAccountBudgetCurr)
    var factSum = getTotalSum(postObject, postObject.dataAccountFactCurr)
    totalSum.totalRest = factSum.restSum + factSum.incomeSum - factSum.expenseSum
    totalSum.billBudgetRest = budgetSum.billSum - factSum.billSum
    totalSum.accountBudgetRest = budgetSum.accountSum - factSum.accountSum
    totalSum.nomenclatureBudgetRest = budgetSum.nomenclatureSum - factSum.nomenclatureSum
    var transferCoef
    if (postObject.cfo == 'Илья') {
      transferCoef = (70 / 100).toFixed(2)
    } else if (postObject.cfo == 'Оксана') {
      transferCoef = 1
    } else {
      transferCoef = 1
    }
    totalSum.firstTransferToFamilyAccount = ((factSum.restSum + budgetSum.salarySum + budgetSum.accumulationNomenclatureIncomeSum) - (budgetSum.expenseSum - budgetSum.transferToFamilyAccountSum) * transferCoef).toFixed(0)
    if (factSum.nomenclatureSum != 0 && budgetSum.nomenclatureSum != 0) {
      totalSum.nomenclatureBudgetExecution = ((factSum.nomenclatureSum / budgetSum.nomenclatureSum) * 100).toFixed(2)
    } else {
      totalSum.nomenclatureBudgetExecution = 0
    }
    if (factSum.accountSum != 0 && budgetSum.accountSum != 0) {
      totalSum.accountBudgetExecution = ((factSum.accountSum / budgetSum.accountSum) * 100).toFixed(2)
    } else {
      totalSum.accountBudgetExecution = 0
    }
    budgetSum.nomenclatureRows.length != 0 ? totalSum.haveBudget = true : totalSum.haveBudget = false
    sum.budgetSum = budgetSum
    sum.factSum = factSum
    sum.totalSum = totalSum
    return sum
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}