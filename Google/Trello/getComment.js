/* eslint-disable no-undef */
function getComment(postObject) {
  try {
    var comment = {}
    var sum = getSum(postObject)
    if (postObject.isFact) {
      //* комментарий по факту
      if (postObject.actionType == 'commentCard') {
        comment.text = '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'updateСomment') {
        comment.text = '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'deleteComment') {
        comment.text = '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      }
      comment.text += '**Остаток средств** ' + '*' + postObject.cfo + '*: ' + sum.totalRest + ' р.' + postObject.lineBreak
      comment.text += '**Остаток бюджета**:' + postObject.lineBreak
      comment.text += '*Статья* - ' + postObject.nomenclature + ': ' + sum.nomenclatureBudgetRest + ' р.' + postObject.lineBreak
      comment.text += '*Номенклатура* - ' + postObject.account + ': ' + sum.accountBudgetRest + ' р.' + postObject.lineBreak
      if (isValidString(postObject.comment)) {
        comment.text += '**Комментарий**: ' + postObject.comment
      }
    } else if (postObject.isBudget) {
      //* комментарий по бюджетуы
      if (postObject.actionType == 'commentCard') {
        comment.text = '**Внесенная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'updateСomment') {
        comment.text = '**Новая сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      } else if (postObject.actionType == 'deleteComment') {
        comment.text = '**Удаленная сумма**: ' + postObject.sum + ' р.' + postObject.lineBreak
      }
      comment.text += '**Бюджет**:' + postObject.lineBreak
      comment.text += '*Номенклатура* - ' + postObject.nomenclature + ': ' + sum.nomenclatureSum + ' р.' + postObject.lineBreak
      comment.text += '*Статья* - ' + postObject.account + ': ' + sum.accountSum + ' р.' + postObject.lineBreak
      comment.text += '*Счет* - ' + postObject.bill + ': ' + sum.billSum + ' р.' + postObject.lineBreak
      if (isValidString(postObject.comment)) {
        comment.text += '**Комментарий**: ' + postObject.comment
      }
    }
    return comment
  } catch (e) {
    console.error('getComment: ' + e)
  }
}