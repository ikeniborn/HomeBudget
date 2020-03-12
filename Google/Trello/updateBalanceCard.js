function updateBalanceCard(postObject) {
  /*
   * @postObject - данные реквеста
   * @sumData - данные по суммам из учета
   */
  //* обновление карточки баланса
  var postObjectBalance = postObject
  postObjectBalance.nomenclature = 'Баланс'
  var balanceCard = getCards(postObjectBalance, postObjectBalance.listId).item
  postObjectBalance.cardId = balanceCard.id
  addCardComment(postObjectBalance)
  if (postObjectBalance.isBudget) {
    var description = getDescription(postObjectBalance)
    postObjectBalance.cardDesc = description.text
    updateCardDesc(postObjectBalance)
  }
}