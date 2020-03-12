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
    } else if (postObject.isBudget) {
      sum = budgetSum
    }
    sum.billBudgetRest = budgetSum.billSum - factSum.billSum
    sum.accountBudgetRest = budgetSum.accountSum - factSum.accountSum
    sum.nomenclatureBudgetRest = budgetSum.nomenclatureSum - factSum.nomenclatureSum
    if (factSum.nomenclature != 0 && budgetSum.nomenclature) {
      sum.nomenclatureBudgetExecution = ((factSum.nomenclature / budgetSum.nomenclature) * 100).toFixed(2)
    } else {
      sum.nomenclatureBudgetExecution = 0
    }
    if (factSum.account != 0 && budgetSum.account) {
      sum.accountBudgetExecution = ((factSum.account / budgetSum.account) * 100).toFixed(2)
    } else {
      sum.accountBudgetExecution = 0
    }
    budgetSum.nomenclatureSum !== 0 ? sum.haveBudget = true : sum.haveBudget = false
    return sum
  } catch (e) {
    console.error('getSum: ' + e)
  }
}