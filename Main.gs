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
  var success = TriggersManager.installDoc(Main.currentDoc);
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
  currentDoc : null,
  currentDocType : null,
  docApp : null,

  init : function(e) {
    // if no event object => click from menu => AuthMode.FULL
    this.authMode = e ? e.authMode : ScriptApp.AuthMode.FULL;

    if (e) {
      this.currentDoc = e.source;
    } else {
      this.currentDoc = SpreadsheetApp.getActiveSpreadsheet();
      if (!this.currentDoc) {
        this.currentDoc = DocumentApp.getActiveDocument();
      }
    }

    if (this.currentDoc) {
      this.currentDocType = this.currentDoc.toString();
    }

    if (this.currentDocType == Constants.SPREADSHEET_TYPE) {
      this.docApp = SpreadsheetApp;
    }
    if (this.currentDocType == Constants.DOCUMENT_TYPE) {
      this.docApp = DocumentApp;
    }
  },

  //all authorization is ok
  start : function() {
    FilesManager.getGPFileType(this.currentDoc);
  }
  
}