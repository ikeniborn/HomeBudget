function parseComment(text, listName) {
  const parseData = {}
  if (text.toLowerCase().match('машина')) {
    parseData.mvz = 'BMW X5'
  } else if (text.toLowerCase().match('гараж')) {
    parseData.mvz = 'Гараж'
  } else if (text.toLowerCase().match('квартира')) {
    parseData.mvz = 'Квартира Котлярова'
  } else {
    parseData.mvz = listName
  }
  parseData.sum = +text.match(/^\d+/)
  parseData.comment = text.split(parseData.sum).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
  return parseData
}