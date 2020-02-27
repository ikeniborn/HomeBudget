function md5(input) {
  var txtHash = ''
  var rawHash = Utilities.computeDigest(
    Utilities.DigestAlgorithm.MD5,
    input,
    Utilities.Charset.UTF_8)
  for (var i = 0; i < rawHash.length; i++) {

    var hashVal = rawHash[i]

    if (hashVal < 0) {
      hashVal += 256
    };
    if (hashVal.toString(16).length == 1) {
      txtHash += '0'
    };
    txtHash += hashVal.toString(16)
  };
  return txtHash.toLowerCase()

}