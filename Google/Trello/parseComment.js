function parseComment(postObject) {
  try {
    const parseData = {}
    var text = postObject.text
    if (text.toLowerCase().match('машина')) {
      parseData.mvz = 'BMW X5'
    } else if (text.toLowerCase().match('гараж')) {
      parseData.mvz = 'Гараж'
    } else if (text.toLowerCase().match('квартира')) {
      parseData.mvz = 'Квартира Котлярова'
    } else {
      parseData.mvz = postObject.listName
    }
    parseData.sum = +text.match(/^\d+/)
    parseData.comment = text.split(parseData.sum).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
    return parseData
  } catch (e) {
    console.error('parseComment: ' + e)
  }
}