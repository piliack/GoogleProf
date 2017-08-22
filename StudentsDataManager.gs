var StudentsDataManagerGP = {
  /**
   *
   * @param studentsSpreadsheet {SpreadsheetFunc}
   * @return {AllStudentsDataClassGP}
   */
  getDatas: function (studentsSpreadsheet) {
    var allStudentsDatas = new AllStudentsDataClassGP();

    //parse all sheets
    var sheets = studentsSpreadsheet.getSheets();
    for (var iSheet = 0, lSheets = sheets.length; iSheet < lSheets; iSheet++) {
      //get and inverse values
      /** @type {SheetFunc}*/
      var sheet = sheets[iSheet];
      var values = UtilsGP.inverse2DArray(sheet.getDataRange().getValues());

      //parse the sheet following its type
      if (sheet.getName() === ConstantsGP.GPSuffixs.STUDENTS_SHEET_STUDENTS_GP) {
        parseStudents(values);
      }
      else {
        parseDistrib(values);
      }
    }

    return allStudentsDatas;

    /**
     *
     * @param colRowArr {Array.<Array<string>>}
     */
    function parseStudents(colRowArr) {
      var studentsCols = new StudentColsClassGP();
      var col = 0, lCol = colRowArr.length;
      var row = 0, lRow = colRowArr[col].length;

      //parse values to extract GP cols
      for (col = 0; col < lCol; col++) {
        for (row=0; row < lRow; row++) {
          var value = colRowArr[col][row];

          //affect values in the correct vars
          if (ConstantsGP.StudentsVars[value.toString()] !== undefined) {
            //if GP col => extract values
            var tempColValues = [];
            for (var i = row + 1; i < lRow; i++) {
              tempColValues.push(colRowArr[col][i]);
            }

            switch (value) {
              case ConstantsGP.StudentsVars.BIRTHDAYS_GP:
                studentsCols.birthdays = tempColValues;
                break;
              case ConstantsGP.StudentsVars.FIRSTNAMES_GP:
                studentsCols.firstnames = tempColValues;
                break;
              case ConstantsGP.StudentsVars.IDS_GP:
                studentsCols.ids = tempColValues;
                break;
              case ConstantsGP.StudentsVars.LEVELS_GP:
                studentsCols.levels = tempColValues;
                break;
              case ConstantsGP.StudentsVars.LASTNAMES_GP:
                studentsCols.lastnames = tempColValues;
                break;

            }
            ;

            //stop parsing this col, all values are retrieved
            break;
          }
        }
      }

      //parse the cols and create data
      lCol = studentsCols.ids.length
      for (col = 0; col < lCol; col++) {
        allStudentsDatas.studentsById[studentsCols.ids[col]] = new StudentDataClassGP(studentsCols.ids[col], studentsCols.firstnames[col], studentsCols.lastnames[col], studentsCols.levels[col], studentsCols.birthdays[col]);
      }
    }

    /**
     *
     * @param colRowArr {Array.<Array<string>>}
     */
    function parseDistrib(colRowArr) {

    }


  }
};

function StudentDataClassGP(id, firstname, lastname, level, birthday) {
  this.id = id;
  this.firstname = firstname;
  this.lastname = lastname;
  this.level = level;
  this.birthday = birthday;
};

function StudentColsClassGP() {
  this.ids = [];
  this.firstnames = [];
  this.lastnames = [];
  this.levels = [];
  this.birthdays = [];
};

/**
 *
 * @param id {string}
 * @constructor
 */
function GroupDataClassGP(id) {
  /** @type {string}*/
  this.id = id;
  /** @type {Object.<string,StudentDataClassGP>}*/
  this.studentsById = {}
}

/**
 *
 * @param id {string}
 * @constructor
 */
function DistribDataClassGP(id) {
  /** @type {string}*/
  this.id = id;
  //TODO title
  /** @type {Object.<string,GroupDataClassGP>}*/
  this.groupsById = {};
};

function AllStudentsDataClassGP() {
  /** @type {Object.<string,StudentDataClassGP>}*/
  this.studentsById = {};
  /** @type {Object.<string,DistribDataClassGP>}*/
  this.distribsById = {};
}
