/**
 * -------------- GOOGLE EVENTS
 */

function onOpen(e) {
  mainGP.init(e);
  Logger.log('onOpen auth : ' + mainGP.authMode);
  //if no authorization => create install addon menu
  if (mainGP.authMode !== ScriptApp.AuthMode.FULL) {
    AddOnMenuManagerGP.createInstallMenuGP();
  } else {
    mainGP.install();
  }
}

function onInstall(e) {
  mainGP.init(e);
  mainGP.install();
}

function onEdit(e) {
  mainGP.init(e);
}

/**
 * when user click on the install menu
 *
 */
function onAddOnInstallMenu() {
  mainGP.init();
  mainGP.install();
}

var mainGP = new MainGPClass();

/**
 * mainGP Application
 */
function MainGPClass() {
  this.authMode = null;
  this.currentDoc = null;
  this.currentDocType = null;
  this.currentDocGPType = null;
  this.docApp = null;
  this.isInitialized = false;

  this.init = function (e) {
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;

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

    if (this.currentDocType === ConstantsGP.FileTypes.SPREADSHEET) {
      this.docApp = SpreadsheetApp;
    }
    if (this.currentDocType === ConstantsGP.FileTypes.DOCUMENT) {
      this.docApp = DocumentApp;
    }
  };


  this.install = function () {
    //try to granted auth
    var success = TriggersManagerGP.installDoc(mainGP.currentDoc);

    var message;
    //if no problem occurred
    if (success) {
      //the current doc belong to a GP project?
      var GPFileType = FilesManagerGP.getGPFileType(mainGP.currentDoc);

      //if not stop here
      if (GPFileType === ConstantsGP.GPFileTypes.NONE) {
        message = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_NOT_GP_PROJECT);
      }
      else {
        message = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_SUCCEED);
      }
    }
    else {
      message = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.INSTALL_FAILED);
    }

    AddOnMenuManagerGP.createInstallMenuResponseSidebar(message);
  };

  //all authorization is ok
  this.start = function () {
    Logger.log('main start ' + FilesManagerGP.getGPFileType(this.currentDoc));


  }

}