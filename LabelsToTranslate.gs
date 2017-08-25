function debug_LabelsToTranslateGP_getLabel() {
  DebugGP.init();
  Logger.log(LabelsToTranslateGP.getLabel(LabelsToTranslateGP.PLANNING_ERROR_FILE,'_GP','folder'));
}

var LabelsToTranslateGP = {

  PROJECT_NAME:'PROJECT_NAME',

  ACTIVITY_MENU:'ACTIVITY_MENU',
  ACTIVITY_SIDEBAR_TITLE : 'ACTIVITY_SIDEBAR_TITLE' ,

  PROBLEM_OCCURRED : 'PROBLEM_OCCURRED',
  OPERATION_SUCCESS : 'OPERATION_SUCCESS',
  ERROR_TITLE:'',

  DISTRIB_ERROR:'DISTRIB_ERROR',

  MENU_PLANNING:'MENU_PLANNING',
  MENU_PLANNING_GENERATE_SHEET:'MENU_PLANNING_GENERATE_SHEET',
  MENU_PLANNING_GENERATE_SPREADSHEET:'MENU_PLANNING_GENERATE_SPREADSHEET',
  MENU_PLANNING_DELETE_SHEET:'MENU_PLANNING_DELETE_SHEET',
  MENU_PLANNING_DELETE_SPREADSHEET:'MENU_PLANNING_DELETE_SPREADSHEET',

  PLANNING_ERROR_FILE:'PLANNING_ERROR_FILE',

  en : {
    PROJECT_NAME:'GP',

    ACTIVITY_MENU:'Activity manager',

    ACTIVITY_SIDEBAR_TITLE : 'Activity',

    PROBLEM_OCCURRED : 'A problem occurred',
    OPERATION_SUCCESS : 'Operation success',
    ERROR_TITLE:'Error',

    DISTRIB_ERROR:'The following distrib id don\'t exist : ',

    MENU_PLANNING:'Planning',
    MENU_PLANNING_GENERATE_SHEET:'Generate with the current sheet',
    MENU_PLANNING_GENERATE_SPREADSHEET:'Generate with the current spreadsheet',
    MENU_PLANNING_DELETE_SHEET:'Delete with the current sheet',
    MENU_PLANNING_DELETE_SPREADSHEET:'Delete with the current spreadsheet',

    PLANNING_ERROR_FILE:'You can only planned in a spreasheet with the #1# suffix in the file name. This file must be in the #2# folder. ',
  },

  getLabel:function(code) {
    var value=this.en[code];
    if (!value) {
      return value;
    }

    var index=0;
    for (var i=1,l=arguments.length;i<l;i++) {
      index=i;
      value=value.replace(new RegExp('#'+index+'#', 'g'), arguments[i]);
    }
    return value;
  }
};