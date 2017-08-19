/**
 * -------------- GOOGLE EVENTS
 */

function onOpen(e) {
  mainGP.init(e);
  Logger.log('onOpen auth : ' + mainGP.getAuthMode(e));

  //if no authorization => create install addon menu
  /*if (mainGP.authMode !== ScriptApp.AuthMode.FULL) {
    AddOnMenuManagerGP.createInstallMenuGP();
  } else {
    mainGP.install();
  }*/
  mainGP.start();
}

function onInstall(e) {
  mainGP.init(e);
  //mainGP.install();
  mainGP.start();
}

function onEdit(e) {
  mainGP.init(e);
}

/**
 * when user click on the install menu
 *
 */
function onAddOnInstallMenu() {
  AddOnMenuManagerGP.createActivitySidebar();
}

function onAddOnActivityMenu() {
  mainGP.init();
  AddOnMenuManagerGP.createActivityMenuGP();
}

function onActivitySidebarHtml() {
  Logger.log('onActivitySidebarHtml');
}

var mainGP = new MainGPClass();

/**
 * mainGP Application
 */
function MainGPClass() {
  /**
   * @private
   * @type {String}
   */
  var authMode = null;
  var currentDoc = null;
  var currentDocType = null;
  var docApp = null;
  var isInitialized = false;

  this.getAuthMode = function (e) {
    if (this.authMode) {
      return this.authMode;
    }
    // if no event object => click from menu => AuthMode.FULL
    this.authMode = e ? e.authMode : ScriptApp.AuthMode.FULL;
    return this.authMode;
  };

  this.getCurrentDoc = function () {
    if (this.currentDoc) {
      return this.currentDoc;
    }
    this.currentDoc = SpreadsheetApp.getActiveSpreadsheet();
    if (!this.currentDoc) {
      this.currentDoc = DocumentApp.getActiveDocument();
    }
    return this.currentDoc;
  };

  this.getCurrentDocType = function () {
    if (this.currentDocType) {
      return this.currentDocType;
    }

    var currentDoc=this.getCurrentDoc();

    if (currentDoc) {
      this.currentDocType = this.currentDoc.toString();
    }

    return this.currentDocType;
  };

  this.getDocApp = function () {
    if (this.docApp) {
      return this.docApp;
    }

    var currentDocType = this.getCurrentDocType();

    if (currentDocType === ConstantsGP.FileTypes.SPREADSHEET) {
      this.docApp = SpreadsheetApp;
    }
    if (currentDocType === ConstantsGP.FileTypes.DOCUMENT) {
      this.docApp = DocumentApp;
    }

    return this.docApp;
  };

  this.init = function (e) {
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;

    this.getAuthMode(e);
  };


  this.install = function () {
    //try to granted auth
    var success = TriggersManagerGP.installDoc(mainGP.getCurrentDoc());

    var message;
    //if no problem occurred
    if (success) {
      //the current doc belong to a GP project?
      var GPFileType = FilesManagerGP.getGPFileType(mainGP.getCurrentDoc());

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

    AddOnMenuManagerGP.createInstallSidebar(message);
  };

  this.start = function () {
    Logger.log('start');
    AddOnMenuManagerGP.createActivityMenuGP();
    
    if (this.getCurrentDocType() === ConstantsGP.FileTypes.DOCUMENT) {
      AddOnMenuManagerGP.createActivityMenuGP();
    }

    AddOnMenuManagerGP.createMenusGP();
  };
}