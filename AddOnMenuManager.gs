/**
 * Manage the menu
 */
var AddOnMenuManager = {

  createInstallMenu : function() {
    if (Main.fileApp != null) {
      Main.fileApp.getUi().createAddonMenu().addItem(
          LabelsToTranslate.INSTALL_MENU, Constants.ON_ADDON_INSTALL_MENU_FUNC)
          .addToUi();
    }
  },

  createInstallMenuReponseSidebar:function(success){
  var message=success?LabelsToTranslate.OPERATION_SUCCESS:LabelsToTranslate.PROBLEM_OCCURED;
  var htmlOutput = HtmlService
     .createHtmlOutput('<p>'+message+'</p>')
     .setTitle(LabelsToTranslate.INSTALL_RESULT_TITLE);
     Main.fileApp.getUi().showSidebar(htmlOutput);
  }

}