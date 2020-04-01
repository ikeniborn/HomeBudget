function parseComment(postObject) {
  try {
    const parseData = {}
    var text = postObject.text
    parseData.sum = +text.match(/^\d+/)
    parseData.comment = text.split(parseData.sum).join('').replace(/^[.,\,, ,\-,\/,\\]/, ' ').trim()
    return parseData
  } catch (e) {
    postObject.error = arguments.callee.name + ': ' + e
    addError(postObject)
  }
}