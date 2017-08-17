/**
 * -------------- google events
 
 
 */

function onOpen(e) {
  mainGP.init(e);
  Logger.log('onOpen auth : ' + mainGP.authMode);
  //if no authorization => install trigger to have authorization
  if (mainGP.authMode !== ScriptApp.AuthMode.FULL) {
    AddOnMenuManagerGP.createInstallMenuGP();
  } else {
    mainGP.start();
  }
}

function onInstall(e) {
  mainGP.init(e);
  mainGP.start();
}

function onEdit(e) {
  mainGP.init(e);
  mainGP.start();
}
/**
 * when user click on the install menu
 * 
 */
function onAddOnInstallMenu() {
  mainGP.init();
  var success = TriggersManager.installDoc(mainGP.currentDoc);
  AddOnMenuManagerGP.createInstallMenuReponseSidebar(success);
  if (success) {
    mainGP.start();
  }
}

var mainGP=new MainGPClass();

/**
 * mainGP Application
 */
function MainGPClass() {
  this.authMode = null;
    this.currentDoc = null;
    this.currentDocType = null;
    this.docApp = null;

  this.init = function(e) {
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

    if (this.currentDocType === Constants.FileTypes.SPREADSHEET) {
      this.docApp = SpreadsheetApp;
    }
    if (this.currentDocType === Constants.FileTypes.DOCUMENT) {
      this.docApp = DocumentApp;
    }
  };

  //all authorization is ok
  this.start = function() {
    Logger.log('main start');
    FilesManager.getGPFileType(this.currentDoc);

    /**
     * @type {ddd}
     */
    var toto;
  }
  
}

function testObj() {
  this.toto='';

  this.totoFunc=function (a) {

  }

}