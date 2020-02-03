function parseComment(text) {
  const parseData = {}
  if (text.toLowerCase().match('машина')) {
    parseData.mvz = 'BMW X5'
  } else if (text.toLowerCase().match('гараж')) {
    parseData.mvz = 'Гараж'
  }
  parseData.sum = +text.match(/^\d+/)
  parseData.comment = text.split(parseData.sum).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
  return parseData
}