var LabelsToTranslate = {

  en : {
    INSTALL_MENU : 'Install',

    INSTALL_RESULT_TITLE : 'Install result',

    PROBLEM_OCCURED : 'A problem occured',
    OPERATION_SUCCESS : 'Operation success'
      
  },

  getLabel:function(code,lang) {
    return this.en[code];
  }
}