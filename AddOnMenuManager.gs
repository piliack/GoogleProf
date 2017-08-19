/**
 * Manage the menu
 */

var AddOnMenuManagerGP = {

  // add install menu to adds on menu
  createInstallMenuGP: function () {
    var label = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_MENU);
    var func=ConstantsGP.EventFuncs.ON_ADDON_INSTALL_MENU;
    mainGP.getDocApp().getUi().createAddonMenu().addItem(label, func).addToUi();
  },

  createActivityMenuGP: function () {
  Logger.log('create menu');
    var label = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_MENU);
    var func=ConstantsGP.EventFuncs.ON_ADDON_INSTALL_MENU;
    mainGP.getDocApp().getUi().createAddonMenu().addItem(label, func).addToUi();
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
    mainGP.getDocApp().getUi().showSidebar(htmlOutput);
  },

  createActivitySidebar: function (message) {
    var title = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_SIDEBAR_TITLE);
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>')
      .setTitle(title);
    mainGP.getDocApp().getUi().showSidebar(htmlOutput);
  }
};