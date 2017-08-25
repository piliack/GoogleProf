var LabelsToTranslateGP = {

  PROJECT_NAME:'PROJECT_NAME',

  INSTALL_MENU : 'INSTALL_MENU',
  ACTIVITY_MENU:'ACTIVITY_MENU',

  INSTALL_SIDEBAR_TITLE : 'INSTALL_SIDEBAR_TITLE' ,
  ACTIVITY_SIDEBAR_TITLE : 'ACTIVITY_SIDEBAR_TITLE' ,

  INSTALL_NOT_GP_PROJECT:'INSTALL_NOT_GP_PROJECT',
  INSTALL_SUCCEED: 'INSTALL_SUCCEED',
  INSTALL_FAILED: 'INSTALL_FAILED',

  PROBLEM_OCCURRED : 'PROBLEM_OCCURRED',
  OPERATION_SUCCESS : 'OPERATION_SUCCESS',
  DISTRIB_ERROR:'DISTRIB_ERROR',

  MENU_PLANNING:'MENU_PLANNING',
  MENU_PLANNING_GENERATE_SHEET:'MENU_PLANNING_GENERATE_SHEET',
  MENU_PLANNING_GENERATE_SPREADSHEET:'MENU_PLANNING_GENERATE_SPREADSHEET',
  MENU_PLANNING_DELETE_SHEET:'MENU_PLANNING_DELETE_SHEET',
  MENU_PLANNING_DELETE_SPREADSHEET:'MENU_PLANNING_DELETE_SPREADSHEET',


  en : {
    PROJECT_NAME:'GP',

    INSTALL_MENU : 'Install',
    ACTIVITY_MENU:'Activity manager',

    INSTALL_SIDEBAR_TITLE : 'Install result',
    ACTIVITY_SIDEBAR_TITLE : 'Activity',


    INSTALL_NOT_GP_PROJECT:'The current Document don\'t  belong to a GP project',
    INSTALL_SUCCEED: 'GP is installed on this document',
    INSTALL_FAILED: 'GP can\'t be installed on this document. Error occurred',

    PROBLEM_OCCURRED : 'A problem occurred',
    OPERATION_SUCCESS : 'Operation success',

    DISTRIB_ERROR:'The following distrib id don\'t exist : ',

    MENU_PLANNING:'Planning',
    MENU_PLANNING_GENERATE_SHEET:'Generate with the current sheet',
    MENU_PLANNING_GENERATE_SPREADSHEET:'Generate with the current spreadsheet',
    MENU_PLANNING_DELETE_SHEET:'Delete with the current sheet',
    MENU_PLANNING_DELETE_SPREADSHEET:'Delete with the current spreadsheet',
  },

  getLabel:function(code) {
    return this.en[code];
  }
};