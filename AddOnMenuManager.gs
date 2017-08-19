/**
 * Manage the menu
 */

var AddOnMenuManagerGP = {

  createActivityMenuGP: function () {
    var label = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_MENU);
    var func=ConstantsGP.EventFuncs.ON_ADDON_ACTIVITY_MENU;
    mainGP.docApp.getUi().createAddonMenu().addItem(label, func).addToUi();
  },

  createMenusGP: function () {

  },

  /**
   *
   * @param message {String}
   */
  createInstallSidebar: function (message) {
    var title = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_SIDEBAR_TITLE);
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>')
      .setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  },

  createActivitySidebar: function (message) {
  Logger.log('createActivitySidebar');
    var title = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_SIDEBAR_TITLE);
    var htmlOutput = HtmlService.createHtmlOutputFromFile(ConstantsGP.HtmlFiles.ACTIVITY_SIDEBAR)
      .setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  }
};