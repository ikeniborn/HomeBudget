//Проверка перевода на счет семьи
    if (rowdata[5].toString().replace(" (-)", "") == 'Перевод на счет Семья' && rowdata[10].length==0) {
      var originalRow = [rowdata[0],rowdata[1],rowdata[2],rowdata[3],rowdata[4],rowdata[5],rowdata[6],rowdata[7]]
      var hashLink = MD5(originalRow.join());
      var insertdate = new Date(rowdata[0].getTime()+1000);
      var insertRow = [insertdate,rowdata[1],'Семья','Семья','Приход','Приход со счета Илья',rowdata[6],rowdata[7]];
      var hashDate= MD5(insertRow.join());
      sheet.getRange(row, 11).setValue(hashDate);
      if(rowdata[2] == 'Илья'){
        sheet.appendRow([insertdate,rowdata[1],'Семья','Семья','Приход','Приход со счета Илья',rowdata[6],rowdata[7],rowdata[8],hashDate,hashLink]);
      }
      else if(rowdata[2] == 'Оксана'){
        sheet.appendRow([insertdate,rowdata[1],'Семья','Семья','Приход','Приход со счета Оксана',rowdata[6],rowdata[7],rowdata[8],hashDate,hashLink]);
      }
    }
