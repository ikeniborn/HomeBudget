function intCommentbudget() {
	var ss = SpreadsheetApp.openById("10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E") //Открываем книгу
	SpreadsheetApp.setActiveSpreadsheet(ss);
	var sheet = ss.getSheetByName('Бюджет'); //'Типы' - имя листа с содержимым списков
	sheet.getRange(2, 1, sheet.getMaxRows() - 1, sheet.getLastColumn()).sort({
		column: 1,
		ascending: true
	});
	var values = sheet.getDataRange().getValues();
	var DirItem = getDirItem(); //получение справочника статей
	var DirMvz = getDirMvz(); //получение справочника мвз
	for (var i = 1; i < values.length; ++i) {
		var row = i + 1;
		var rowDate = values[i][0];
		var rowPeriod = values[i][1];
		var rowCfo = values[i][2];
		var rowType = values[i][3];
		var rowItem = values[i][4];
		var rowSum = values[i][5];
		var rowComment = values[i][6];
		var rowHash = values[i][8];

		if (rowHash.length == 0) {
			//Определение статьи
			if (rowType.length == 0) {
				var dataDirItem = DirItem.filter(function (row) {
					return row[0] == rowItem || row[1] == rowItem
				})
				var insertType = dataDirItem[0][2];
				var insertItem = dataDirItem[0][1];
				//обновление ячеек
				sheet.getRange(row, 4).setValue(insertType);
				sheet.getRange(row, 5).setValue(insertItem);
			}
			//Добавление комментари
			var insertCommect = rowCfo + "/" + rowComment + "/" + row
			sheet.getRange(row, 8).setValue(insertCommect)
			//Добавление hash записи строки
			var insertRow = [rowDate, rowPeriod, rowCfo, insertType, insertItem, rowSum, rowComment, insertCommect]
			if (rowHash.length == 0) {
				var newHash = MD5(insertRow.join())
				sheet.getRange(row, 9).setValue(newHash)
			}
			//Проверка перевода на счет семьи
			if (insertItem == 'Перевод на счет Семья') {
				var insertdate = new Date(rowDate.getTime() + 1000);
				var insertCommect = "Семья/Семья/Пополнение/" + (i + 2)
				if (rowCfo == 'Илья') {
					var ExtraRow = [insertdate, rowPeriod, 'Семья', 'Приход', 'Приход со счета Илья', rowSum, rowComment, insertCommect]
					var hashExtraRow = MD5(ExtraRow.join());
					sheet.appendRow([insertdate, rowPeriod, 'Семья', 'Приход', 'Приход со счета Илья', rowSum, rowComment, insertCommect, hashExtraRow]);
				} else if (rowCfo == 'Оксана') {
					var ExtraRow = [insertdate, rowPeriod, 'Семья', 'Приход', 'Приход со счета Оксана', rowSum, rowComment, insertCommect]
					var hashExtraRow = MD5(ExtraRow.join());
					sheet.appendRow([insertdate, rowPeriod, 'Семья', 'Приход', 'Приход со счета Оксана', rowSum, rowComment, insertCommect, hashExtraRow]);
				}
			}
		}
	}
	var maxRows = sheet.getMaxRows();
	var lastRow = sheet.getLastRow();
	if (maxRows - lastRow != 0) {
		sheet.deleteRows(lastRow + 1, maxRows - lastRow);
	}
	updateDataBudget()
}

function updateDataBudget() {
	var sourceSS = SpreadsheetApp.openById('10cO9hdYF-K4cLMC7ZbrDqM0RByswKAFfd3E3ggwyl8E');
	var targetSS = SpreadsheetApp.openById('1mBsaVLbKLoIXN2WY9Oi-XBPbViwbCt29gozLkOL5sLc');
	var sourceSheet = sourceSS.getSheetByName('Бюджет');
	var targetSheet = targetSS.getSheetByName('Бюджет');
	var sourceArray = sourceSheet.getDataRange().getValues();
	var targetArray = targetSheet.getDataRange().getValues();
	var arrayDate = [];
	for (var j = 0; j < targetArray.length; j++) {
		arrayDate.push(targetArray[j][0]);
	};

	var maxDate = arrayDate.reduce(function (a, b) {
		return a > b ? a : b;
	});
	var newData = sourceArray.filter(function (row) {
		return row[0] > new Date(maxDate.getTime());
	});
	if (newData.length > 0) {
		for (var i = 0; i < newData.length; i++) {
			var vdata = newData[i][0]
			var vmonth = newData[i][1]
			var vcfo = newData[i][2]
			var vcost = newData[i][3]
			var vnom = newData[i][4]
			var vsum = newData[i][5]
			var vcomment = newData[i][7]
			targetSheet.appendRow([vdata, vmonth, vcfo, vcost, vnom, vsum, vcomment])
		}
	}
	//Удаление пустых строк
	var maxRows = targetSheet.getMaxRows();
	var lastRow = targetSheet.getLastRow();
	if (maxRows - lastRow != 0) {
		targetSheet.deleteRows(lastRow + 1, maxRows - lastRow);
	}
}