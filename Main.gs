/**
 * -------------- google events
 */

function onOpen(e) {
  Main.init(e);
  Logger.log('onOpen auth : ' + Main.authMode);
  //if no authorization => install trigger to have authorization
  if (Main.authMode != ScriptApp.AuthMode.FULL) {
    AddOnMenuManagerGP.createInstallMenuGP();
  } else {
    Main.start();
  }
}

function onInstall(e) {
  Main.init(e);
  Main.start();
}

function onEdit(e) {
  Main.init(e);
  Main.start();
}
/**
 * when user click on the install menu
 * 
 */
function onAddOnInstallMenu() {
  Main.init();
  var success = TriggersManager.installDoc(Main.currentFile);
  AddOnMenuManagerGP.createInstallMenuReponseSidebar(success);
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
  docApp : null,

  init : function(e) {
    // if no event object => click from menu => AuthMode.FULL
    this.authMode = e ? e.authMode : ScriptApp.AuthMode.FULL;

    if (e) {
      this.currentFile = e.source;
    } else {
      this.currentFile = SpreadsheetApp.getActiveSpreadsheet();
      if (!this.currentFile) {
        this.currentFile = DocumentApp.getActiveDocument();
      }
    }

    if (this.currentFile) {
      this.currentFileType = this.currentFile.toString();
    }

    if (this.currentFileType == Constants.SPREADSHEET_TYPE) {
      this.docApp = SpreadsheetApp;
    }
    if (this.currentFileType == Constants.DOCUMENT_TYPE) {
      this.docApp = DocumentApp;
    }
  },

  //all authorization is ok
  start : function() {
    
  }
  
}