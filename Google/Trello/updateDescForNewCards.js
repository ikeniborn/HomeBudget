function updateDescForNewCards(postObject) {
  try {
    var cards = getCards(postObject, postObject.listId).array
    var postObjectCard = JSON.parse(JSON.stringify(postObject))
    postObjectCard.dataAccount = getAllData(postObject, 'account')
    postObjectCard.dataAccountFactCurr = getCurrData(postObject, 'Факт')
    postObjectCard.dataAccountBudgetCurr = getCurrData(postObject, 'Бюджет')
    //* обновление описание карточки
    cards.forEach(function (card) {
      postObjectCard.cardId = card.id
      postObjectCard.cardName = card.name
      postObjectCard.cardLabelColor = card.color
      postObjectCard.accountingItem = getAccountingItem(postObjectCard)
      postObjectCard.cashFlow = postObjectCard.accountingItem.item.cashFlow
      postObjectCard.bill = postObjectCard.accountingItem.item.bill
      postObjectCard.account = postObjectCard.accountingItem.item.account
      postObjectCard.nomenclature = card.name
      var description = getDescription(postObjectCard)
      if (description.haveBudget) {
        postObjectCard.cardDescription = description.text
        updateCardDesc(postObjectCard)
      }
    })
  } catch (e) {
    console.error('updateDescForNewCards' + e)
  }
}