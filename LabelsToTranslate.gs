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

    DISTRIB_ERROR:'The following distrib id don\'t exist : '
  },

  getLabel:function(code) {
    return this.en[code];
  }
};