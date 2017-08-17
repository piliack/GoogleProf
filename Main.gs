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
  //try to granted auth
  var success = TriggersManagerGP.installDoc(mainGP.currentDoc);

  var message;
  //if no problem occurred
  if (success) {
    //the current doc belong to a GP project?
    var GPFileType = FilesManagerGP.getGPFileType(mainGP.currentDoc);

    //if not stop here
    if (GPFileType === ConstantsGP.GPFileTypes.NONE) {
      message = LabelsToTranslateGP.en.INSTALL_NOT_GP_PROJECT;
    }
    //if ok start application
    else {
      message = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.en.OPERATION_SUCCESS);
      mainGP.start();
    }
  }
  else {
    message = LabelsToTranslateGP.getLabel(LabelsToTranslateGP.en.PROBLEM_OCCURED);
  }

  AddOnMenuManagerGP.createInstallMenuResponseSidebar(message);
}

var mainGP = new MainGPClass();

/**
 * mainGP Application
 */
function MainGPClass() {
  this.authMode = null;
  this.currentDoc = null;
  this.currentDocType = null;
  this.docApp = null;

  this.init = function (e) {
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

  //all authorization is ok
  this.start = function () {
    Logger.log('main start ' + FilesManagerGP.getGPFileType(this.currentDoc));


  }

}