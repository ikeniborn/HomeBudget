function parseListName(listName) {
  var name
  if (listName.match('Илья')) {
    name = 'Илья'
  } else if (listName.match('Семья')) {
    name = 'Семья'
  } else if (listName.match('Оксана')) {
    name = 'Оксана'
  }
  return name
}