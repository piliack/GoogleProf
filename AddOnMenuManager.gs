/**
 * Manage the menu
 */

var AddOnMenuManagerGP = {

  // add install menu to adds on menu
  createInstallMenuGP: function () {
    var label = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_MENU);

    mainGP.docApp.getUi().createAddonMenu().addItem(label, ConstantsGP.EventFuncs.ON_ADDON_INSTALL_MENU).addToUi();
  },

  createMenusGP: function () {

  },

  /**
   *
   * @param message {String}
   */
  createInstallMenuResponseSidebar: function (message) {

    var title = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_RESULT_TITLE);
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>')
      .setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  }
};