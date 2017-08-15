/**
 * -------------- google events
 */

function onOpen(e) {
  Main.init(e);
  Logger.log('on open : ' + Main.authMode + ',' + ScriptApp.AuthMode.FULL);
  var a=Main.authMode.toString();
  var b=ScriptApp.AuthMode.FULL;
  var c='t';
  var test=(Main.authMode!=ScriptApp.AuthMode.FULL);
  if (test) {
    Logger.log('on open false : ');
    AddOnMenuManagerGP.createInstallMenuGP();
    Logger.log('on open 2 false : ');
  } else {
    Logger.log('on open true : ');
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
  Main.init();
  var success = TriggersManager.installFile(Main.currentFile);
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
  fileApp : null,

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
      this.fileApp = SpreadsheetApp;
    } 
    if (this.currentFileType == Constants.DOCUMENT_TYPE) {
      this.fileApp = DocumentApp;
    }

    Logger.log('main init : ' + this.authMode);
  },

  start : function() {
  }
}