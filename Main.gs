/**
 * -------------- google events
 */

function onOpen(e) {
  Logger.log("main open :" + e.authMode + ',' + e.source);
  Logger.log('ScriptApp.getUserTriggers : '+ScriptApp.getUserTriggers);
  Main.init(e);
  if (Main.authMode != ScriptApp.AuthMode.FULL) {
    AddOnMenuManager.createInstallMenu();
  } else {
    Main.start();
  }
}

function onInstall(e) {
  Main.init(e);
}

function onEdit(e) {
  Main.init(e);
}
/**
 * when user click on the install menu
 * 
 */
function onAddOnInstallMenu() {
  Logger.log('ScriptApp.getUserTriggers : '+ScriptApp.getUserTriggers);
  Main.init();
  var success = TriggersManager.installFile(this.currentFile);
  AddOnMenuManager.createInstallMenuReponseSidebar(success);
  if (success) {
    Main.start();
  }
}

/**
 * Main Application
 */
var Main = {
  authMode : null,
  currentFile : null,
  currentFileType : null,
  fileApp : null,

  init : function(e) {
    // if no event object => click from menu => AuthMode.FULL
    this.authMode = e ? e.authMode : ScriptApp.AuthMode.FULL;

    if (e) {
      this.currentFile = e.source;
      Logger.log('init e: ' + this.currentFile);
    } else {
      this.currentFile = SpreadsheetApp.getActiveSpreadsheet();
      Logger.log('init sheet: ' + this.currentFile);
      if (!this.currentFile) {
        this.currentFile = DocumentApp.getActiveDocument();
      }
    }

    if (this.currentFile) {
      this.currentFileType = this.currentFile.toString();
    }

    if (this.currentFileType == Constants.SPREADSHEET_TYPE) {
      this.fileApp = SpreadsheetApp;
    } else if (this.currentFileType == Constants.DOCUMENT_TYPE) {
      this.fileApp = DocumentApp;
    }
  },

  start : function() {
  }
}