function apiTest() {
  var spreadsheetId = '1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc';
  var rangeName = 'Факт!A:A';
  var values = Sheets.Spreadsheets.Values.get(spreadsheetId, rangeName).values;
  if (!values) {
    Logger.log('No data found.');
  } else {
    Logger.log('Name, Major:');
    for (var row = 0; row < values.length; row++) {
      // Print columns A and E, which correspond to indices 0 and 4.
      Logger.log(' - %s', values[row][0]);
    }
  }
}