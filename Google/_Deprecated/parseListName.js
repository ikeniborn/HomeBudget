function parseListName(listName) {
  try {
    var name
    if (listName.match('Илья')) {
      name = 'Илья'
    } else if (listName.match('Семья')) {
      name = 'Семья'
    } else if (listName.match('Оксана')) {
      name = 'Оксана'
    }
    return name
  } catch (e) {
    console.error('parseComment: ' + e)
  }
}