/**
 * -------------- GOOGLE EVENTS
 */

var testObj=new testClass();

function testClass() {
  var toto=3;

  this.set=function(){
    toto+=1;
  }

  this.get=function() {
    return toto;
  }
}

function test() {
  testObj.set();
  testObj.set();
  Logger.log(testObj.get());
}

function onOpen(e) {
  mainGP.init(e);
  Logger.log('onOpen auth : ' + mainGP.getAuthMode(e)+);

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
  mainGP.init();
  //mainGP.install();
}

function onAddOnActivityMenu() {
  mainGP.init();

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
  this.authMode = null;
  this.currentDoc = null;
  this.currentDocType = null;
  this.docApp = null;
  this.isInitialized = false;

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

    if (this.currentDoc) {
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
    if (this.currentDocType === ConstantsGP.FileTypes.DOCUMENT) {
      AddOnMenuManagerGP.createActivityMenuGP();
    }

    AddOnMenuManagerGP.createMenusGP();
  };
}