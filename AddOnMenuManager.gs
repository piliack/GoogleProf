/**
 * Manage the menu
 */

var AddOnMenuManagerGP = {

  // add install menu to adds on menu
  createInstallMenuGP: function () {
    Logger.log('createInstallMenu');
    var label = LabelsToTranslateGP.getLabel('INSTALL_MENU');
    SpreadsheetApp.getUi().createAddonMenu().addItem(label,
      ConstantsGP.EventFuncs.ON_ADDON_INSTALL_MENU).addToUi();
  },

  /**
   *
   * @param message {String}
   */
  createInstallMenuResponseSidebar: function (message) {

    var title = LabelsToTranslateGP.getLabel('INSTALL_RESULT_TITLE');
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>')
      .setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  }
};