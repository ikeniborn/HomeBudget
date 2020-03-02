function parseComment(postObject) {
  try {
    const parseData = {}
    var costCenter = getCostCenter(postObject).array
    var text = postObject.text
    parseData.mvz = costCenter.map(function (array) {
      if (text.toLowerCase().match(array.tag)) {
        return array.mvz
      }
    })
    parseData.sum = +text.match(/^\d+/)
    parseData.comment = text.split(parseData.sum).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
    return parseData
  } catch (e) {
    console.error('parseComment: ' + e)
  }
}