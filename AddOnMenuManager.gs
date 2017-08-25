/**
 * Manage the menu
 */

var AddOnMenuManagerGP = {

  createActivityMenuGP: function () {
    var label = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_MENU);
    var func = ConstantsGP.EventFuncs.ON_ADDON_ACTIVITY_MENU;
    //if webapps don't work
    try {
      mainGP.docApp.getUi().createAddonMenu().addItem(label, func).addToUi()
    } catch (e) {
    }
    ;
  },

  createMenusGP: function () {
    var planningLabel = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_MENU);
    var planningGenerateLabel = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_MENU);
    var func = ConstantsGP.EventFuncs.ON_ADDON_ACTIVITY_MENU;
    var menu=mainGP.docApp.getUi().createAddonMenu().addItem(LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_MENU), '')
      .addToUi()
  },

  /**
   *
   * @param message {String}
   */
  createInstallSidebar: function (message) {
    var title = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_SIDEBAR_TITLE);
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>').setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  },

  createActivitySidebar: function (message) {
    var title = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_SIDEBAR_TITLE);
    var htmlOutput = HtmlService.createHtmlOutputFromFile(ConstantsGP.HtmlFiles.ACTIVITY_SIDEBAR).setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  }
};