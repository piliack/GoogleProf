/**
 * Manage the menu
 */
var AddOnMenuManagerGP = {

  // add install menu to adds on menu
  createInstallMenuGP : function() {
    Logger.log('createInstallMenu');
    var label = LabelsToTranslate.getLabel('INSTALL_MENU');
    SpreadsheetApp.getUi().createAddonMenu().addItem(label,
        Constants.EventFuncs.ON_ADDON_INSTALL_MENU).addToUi();
  },

  createInstallMenuReponseSidebar : function(success) {
    var message = LabelsToTranslate.getLabel(success ? 'OPERATION_SUCCESS'
        : 'PROBLEM_OCCURED');
    var title = LabelsToTranslate.getLabel('INSTALL_RESULT_TITLE');
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>')
        .setTitle(title);
    Main.docApp.getUi().showSidebar(htmlOutput);
  }
}