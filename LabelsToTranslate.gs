var LabelsToTranslateGP = {

  en : {
    INSTALL_MENU : 'Install',
    INSTALL_RESULT_TITLE : 'Install result',
    INSTALL_NOT_GP_PROJECT:'The current Document don\'t  belong to a '+ConstantsGP.GPFileSuffixs.DEFAULT+' project',

    PROBLEM_OCCURED : 'A problem occured',
    OPERATION_SUCCESS : 'Operation success'
      
  },

  getLabel:function(code,lang) {
    return this.en[code];
  }
};