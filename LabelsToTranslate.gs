var LabelsToTranslateGP = {

  en : {
    PROJECT_NAME:'GP',

    INSTALL_MENU : 'Install',
    INSTALL_RESULT_TITLE : 'Install result',
    INSTALL_NOT_GP_PROJECT:'The current Document don\'t  belong to a GP project',
    INSTALL_SUCCEED: 'GP is installed on this document',
    INSTALL_FAILED: 'GP can\'t be installed on this document. Error occurred',

    PROBLEM_OCCURED : 'A problem occurred',
    OPERATION_SUCCESS : 'Operation success'
      
  },

  getLabel:function(code,lang) {
    return this.en[code];
  }
};