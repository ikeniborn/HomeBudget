function updateBalanceCard(postObject, sumData) {
  /*
   * @postObject - данные реквеста
   * @sumData - данные по суммам из учета
   */
  //* обновление карточки баланса
  var postObjectBalance = postObject
  postObjectBalance.nomenclature = 'Баланс'
  var balanceCard = getCards(postObjectBalance, postObjectBalance.listId).item
  postObjectBalance.cardId = balanceCard.id
  var comment = '*Остаток бюджета:* ' + sumData.totalBudget + postObjectBalance.lineBreak
  comment += '*Остаток средств:* ' + sumData.totalFact + postObjectBalance.lineBreak
  if (postObjectBalance.bill == 'Приход') {
    comment += '*Исполнение по приходу:* ' + ((sumData.incomeFact / sumData.incomeBudget) * 100).toFixed(2) + encodeData('%', '%')
  } else if ((postObjectBalance.bill == 'Расход')) {
    comment += '*Исполнение по расходу:* ' + ((sumData.expenseFact / sumData.expenseBudget) * 100).toFixed(2) + encodeData('%', '%')
  }
  addCardComment(postObjectBalance, comment)
}