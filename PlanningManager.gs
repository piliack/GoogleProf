function debug_PlanningManagerGP_generatePlanning() {
  DebugGP.init();
  var file=FilesManagerGP.getProjectFileByName('Test_P_GP');
  PlanningManagerGP.generatePlanning(SpreadsheetApp.open(file));
}

var PlanningManagerGP = {
  /**
   *
   * @param spreadsheet {SpreadsheetFunc}
   */
  generatePlanning: function (spreadsheet) {

    /**
     *
     * @param sheet {SheetFunc}
     */
    function generateSheet(sheet) {
      //all the values of the sheet per col and per row
      var colRowArr = UtilsGP.inverse2DArray(sheet.getDataRange().getValues());
      //it's a col index, start to 0. in Google function col start to 1
      var col = 0, lCol = colRowArr.length;
      var row = 0, lRow = 0;
      //all value of the GP vars in the sheet
      var valuesByGPVarName = {};
      var tempArr = [];
      var i = 0, l = 0, p = '';
      //the position of the DETAILS_GP var
      var detailsCol = -1, detailsRow = -1;
      var value;

      //parse values to extract GP vars
      for (col = 0; col < lCol; col++) {
        lRow = colRowArr[col].length;
        for (row = 0; row < lRow; row++) {
          value = colRowArr[col][row];

          //no vars beyond this row
          if (value === ConstantsGP.PlanningVars.DETAILS_GP) {
            detailsCol = col;
            detailsRow = row;
            break;
          }
          //simple var detected
          if (ConstantsGP.PlanningVars[value]) {
            valuesByGPVarName[value] = colRowArr[col + 1][row];
          }
          //var with value in col
          if (ConstantsGP.PlanningColVars[value]) {
            tempArr = [];
            for (i = row + 1; i < lRow; i++) {
              //empty cell is the end of the col
              if (colRowArr[col][i] !== false && !colRowArr[col][i]) {
                break;
              }

              tempArr.push(colRowArr[col][i]);

            }
            //get the values of the col var
            valuesByGPVarName[value] = tempArr;
          }
        }
      }

      //get datas of students
      var allStudentsData = StudentsDataManagerGP.getDatas();
      //get the right distrib
      var distrib = allStudentsData.distribsById[valuesByGPVarName[ConstantsGP.PlanningVars.DISTRIB_GP]];
      //the distrib is not found => stop here
      if (!distrib) {
        throw LabelsToTranslateGP.getLabel(LabelsToTranslateGP.DISTRIB_ERROR);
        return;
      }

      //TODO manage public holiday

      //purge details part on sheet
      sheet.getRange(detailsRow + 1, detailsCol + 2, lRow - detailsRow, lCol - detailsCol - 1).clearContent();
      sheet.getRange(detailsRow + 2, detailsCol + 1, lRow - detailsRow - 1).clearContent();

      //build activities header in details part
      var activities = valuesByGPVarName[ConstantsGP.PlanningColVars.ACTIVITIES_GP].slice();
      var activitiesLength = activities.length;
      var activityIndexs = [];

      for (i = 0; i < activitiesLength; i++) {
        activityIndexs.push(i);
        //set value in sheet
        sheet.getRange(detailsRow + 1, detailsCol + 3 + i).setValue(activities[i]);
      }

      var addLength = 0, iActivity = 0;
      //count number of time slot to planned
      var iPlanning = 0;
      //the current position of the planning
      var rowPlanning = 0;
      /** @type {Date} */
      var startDatePlanning = valuesByGPVarName[ConstantsGP.PlanningVars.START_DATE_GP];
      /** @type {Array.<Date>} */
      var timeSlotsStarts = valuesByGPVarName[ConstantsGP.PlanningColVars.TIMESLOTS_STARTS_GP];
      /** @type {Array.<Date>} */
      var timeSlotsEnds = valuesByGPVarName[ConstantsGP.PlanningColVars.TIMESLOTS_ENDS_GP];
      var timeSlotsLength = timeSlotsStarts.length;
      var weekdays = valuesByGPVarName[ConstantsGP.PlanningColVars.WEEKDAYS_GP];
      var startDate, endDate, iGroup = 0;

      var groupIds = [];
      for (p in distrib.groupsById) {
        groupIds.push(p);
      }

      var groupIdsLength = groupIds.length;

      if (activitiesLength < groupIdsLength) {
        addLength = (parseInt(groupIdsLength / activitiesLength) - 1) * activitiesLength;
        if (groupIdsLength % activitiesLength > 0) {
          addLength += activitiesLength;
        }

        iActivity = 0;
        for (i = 0; i < addLength; i++) {
          activityIndexs.push(iActivity);
          iActivity++;
          if (iActivity >= activitiesLength) {
            iActivity = 0;
          }

          groupIds.push('');
        }
      }

      var currentGroupIdsAugmented;

      //planning for each repetition
      for (var iRepetition = 0; iRepetition < valuesByGPVarName[ConstantsGP.PlanningVars.REPETITION_GP]; iRepetition++) {
        iPlanning = 0;
        //index start to 0
        rowPlanning = detailsRow + 1;
        currentGroupIdsAugmented = groupIds.slice();

        //planned all the activities
        do {
          //if the day is correct
          if (weekdays.indexOf(startDatePlanning.getDay()) > -1) {
            //for each time slot
            for (i = 0; i < timeSlotsLength; i++) {
              startDate = new Date(startDatePlanning.getTime());
              startDate.setHours(timeSlotsStarts[i].getHours());
              startDate.setMinutes(timeSlotsStarts[i].getMinutes());

              endDate = new Date(startDatePlanning.getTime());
              endDate.setHours(timeSlotsEnds[i].getHours());
              endDate.setMinutes(timeSlotsEnds[i].getMinutes());

              sheet.getRange(rowPlanning + 1, detailsCol + 1).setValue(startDate);
              sheet.getRange(rowPlanning + 1, detailsCol + 2).setValue(endDate);

              for (iGroup = 0; iGroup < currentGroupIdsAugmented.length; iGroup++) {
                if (!currentGroupIdsAugmented[iGroup]) {
                  continue;
                }
                sheet.getRange(rowPlanning + 1, detailsCol + 3 + activityIndexs[iGroup]).setValue(currentGroupIdsAugmented[iGroup]);
              }

              currentGroupIdsAugmented.unshift(currentGroupIdsAugmented.pop());
              iPlanning++;
              rowPlanning++;
              if (iPlanning >= activitiesLength) {
                break;
              }
            }
          }
          startDatePlanning.setDate(startDatePlanning.getDate() + 1);
        } while (iPlanning < activitiesLength)
      }
    }
  }
};