/**
 * Manage the menu
 */
var AddOnMenuManager = {

  createInstallMenu : function() {
    var fileApp = null;

    if (Main.currentFileType == Constants.SPREADSHEET_TYPE) {
      fileApp = SpreadsheetApp;
    } else if (Main.currentFileType == Constants.DOCUMENT_TYPE) {
      fileApp = DocumentApp;
    }

    if (fileApp != null) {
      fileApp.getUi().createAddonMenu().addItem(
          LabelsToTranslate.Menus.INSTALL, Constants.ON_ADDON_INSTALL_MENU)
          .addToUi();
    }
  },

}