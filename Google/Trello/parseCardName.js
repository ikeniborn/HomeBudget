function parseCardName(cardName) {
  var name
  if (cardName.match('Илья')) {
    name = 'Илья'
  } else if (cardName.match('Семья')) {
    name = 'Семья'
  } else if (cardName.match('Оксана')) {
    name = 'Оксана'
  }
  return name
}