var SkillsDataManagerGP = {
  //TODO
  /**
   *
   * @param spreadsheet {SpreadsheetFunc}
   */
  getSkillDatas: function (spreadsheet) {
    var sheets = spreadsheet.getSheets();
    //the cell values per col per row
    var sheetColRowValues = [];
    /** @type {Array.<SkillLevelClassGP>} */
    var skillLevels = [];
    var skillDataValues = [];

    /** @type {Object.<string,SkillDataClassGP>} */
    var tempLabelById = {};
    /** @type {Array.<TempDataClass>} */
    var tempDatas = [];
    /** @type {TempDataClass} */
    var tempData = null;
    var tempId, tempMainId = '';
    var tempType = '';
    var tempDataRowIndex = -1;
    var tempDataRowsLength = -1;

    function TempDataClass(mainId) {
      this.mainId = mainId;
      this.codesById = {};
      this.valuesById = {};
      this.codeColIndexById = {};
      this.valueColIndexById = {};
      this.lastId = '';
      this.lastCodeById = {};
      this.lastValueById = {};
    }

    //parse sheets
    for (var i = 0, l = sheets.length; i < l; i++) {
      //parse cells by col and collect temp data
      sheetColRowValues = UtilsGP.inverse2DArray(sheets[i].getDataRange().getValues());
      for (var col = 0, colLength = sheetColRowValues.length; col < colLength; col++) {
        for (var row = 0, rowLength = sheetColRowValues[col].length; row < rowLength; row++) {
          //detect if the cell is in the right format
          var valueSplit = sheetColRowValues[col][row].split(ConstantsGP.GPSuffixs.SKILLS_TYPE_SEPARATOR);
          if (valueSplit.length !== 2) {
            continue;
          }
          //id without _GP suffix
          tempId = UtilsGP.getFirstPartSuffixed(valueSplit[0], ConstantsGP.GPSuffixs.DEFAULT);
          //LABEL,CODES or VALUES
          tempType = valueSplit[1];

          //if type LABEL found, search for the cell in the next col. create input
          if (tempType === ConstantsGP.GPSuffixs.SKILLS_TYPES.LABEL) {
            //if col n+1 exist, row exist, and label value exist => create enter
            if (colLength > col + 1 && sheetColRowValues[col + 1].length > row && sheetColRowValues[col + 1][row]) {
              tempLabelById[tempId] = sheetColRowValues[col + 1][row];
            }
          }

          //if type CODES or VALUES, copy the value in the col next after this row
          if (tempType === ConstantsGP.GPSuffixs.SKILLS_TYPES.CODES || tempType === ConstantsGP.GPSuffixs.SKILLS_TYPES.VALUES) {

            if (tempDataRowIndex < 0) {
              tempDataRowIndex = row;
              tempDataRowsLength = rowLength - row;
            }

            //id can have the same root id. the skill will be on the same level
            valueSplit = tempId.split(ConstantsGP.GPSuffixs.SKILLS_ID_SEPARATOR);
            tempMainId = valueSplit[0];

            var iTempsDatas = UtilsGP.IndexOfArrayOfObject(tempDatas, 'mainId', tempMainId);
            if (iTempsDatas >= 0) {
              tempData = tempDatas[iTempsDatas];
            }
            else {
              tempData = new TempDataClass(tempMainId);
              tempDatas.push(tempData);
            }

            var tempDataById = null;
            if (tempType === ConstantsGP.GPSuffixs.SKILLS_TYPES.CODES) {
              tempData.codeColIndexById[tempId] = col;
              tempDataById = tempData.codesById;
            }
            else {
              tempData.valueColIndexById[tempId] = col;
              tempDataById = tempData.valuesById;
            }

            tempDataById[tempId] = [];

            for (var j = row + 1, m = rowLength; j < m; j++) {
              tempDataById[tempId].push(sheetColRowValues[col][j]);
            }
            //stop the parsing when all rows are copied
            break;
          }
        }
      }
    }


    /** @type {SkillDataClassGP}*/
    var tempSkillDataObj = null;

    for (var iDatas = 0, lDatas = tempDatas.length; iDatas < lDatas; iDatas++) {
      var skillLevelObj = new SkillLevelClassGP();
      skillLevels.push(skillLevelObj);
      for (var idData in tempDatas[iDatas].valuesById) {
        skillLevelObj[idData] = new SkillDataClassGP(idData, tempLabelById[idData]);
      }
    }

    //parse data in row
    for (var row = 0; row < tempDataRowsLength; row++) {
      //for all data by level
      for (var iDatas = 0, lDatas = tempDatas.length; iDatas < lDatas; iDatas++) {
        var skillLevelObj = skillLevels[iDatas];
        var idValueNotEmpty = '';

        //search for the values not empty
        for (var idData in tempDatas[iDatas].valuesById) {
          if (skillLevelObj)

            if (tempDatas[iDatas].valuesById[idData][row]) {
              idValueNotEmpty = tempDatas[iDatas].valuesById[idData][row];
            }
        }


      }
    }
  }

};

function SkillLevelClassGP() {
  this.skillDataById = {};
};

function SkillDataClassGP(id, label) {
  this.id = id;
  this.label = label;
};

function SkillDataValueClassGP(skillData, parentCode, code, value) {
  /** @type {SkillDataClassGP}*/
  this.skillData = skillData;
  this.parentCode = parentCode;
  this.code = code;
  this.value = value;
}