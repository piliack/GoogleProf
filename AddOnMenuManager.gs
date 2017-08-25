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
    var menu = mainGP.docApp.getUi().createAddonMenu(LabelsToTranslateGP.getLabel(LabelsToTranslateGP.MENU_PLANNING))
      .addItem(LabelsToTranslateGP.getLabel(LabelsToTranslateGP.MENU_PLANNING_GENERATE_SHEET), ConstantsGP.EventFuncs.ON_ADDON_PLANNING_GENERATE_BY_SHEET)
      .addItem(LabelsToTranslateGP.getLabel(LabelsToTranslateGP.MENU_PLANNING_DELETE_SHEET), ConstantsGP.EventFuncs.ON_ADDON_PLANNING_DELETE_BY_SHEET)
      .addItem(LabelsToTranslateGP.getLabel(LabelsToTranslateGP.MENU_PLANNING_GENERATE_SPREADSHEET), ConstantsGP.EventFuncs.ON_ADDON_PLANNING_GENERATE_BY_SPREADSHEET)
      .addItem(LabelsToTranslateGP.getLabel(LabelsToTranslateGP.MENU_PLANNING_DELETE_SPREADSHEET), ConstantsGP.EventFuncs.ON_ADDON_PLANNING_DELETE_BY_SPREADSHEET)
      .addToUi()
  },

  /**
   *
   * @param message {String}
   */
  createMessageSidebar: function (title,message) {
    var htmlOutput = HtmlService.createHtmlOutput('<p>' + message + '</p>').setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  },

  createOperationResultSidebar:function (title,succeed) {
    var code=succeed?LabelsToTranslateGP.OPERATION_SUCCESS:LabelsToTranslateGP.PROBLEM_OCCURRED;
    this.createMessageSidebar(title,LabelsToTranslateGP.getLabel(code));
  },

  createActivitySidebar: function (message) {
    var title = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ACTIVITY_SIDEBAR_TITLE);
    var htmlOutput = HtmlService.createHtmlOutputFromFile(ConstantsGP.HtmlFiles.ACTIVITY_SIDEBAR).setTitle(title);
    mainGP.docApp.getUi().showSidebar(htmlOutput);
  }
};