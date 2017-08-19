/**
 * -------------- GOOGLE EVENTS
 */

function test() {
  Logger.log(DriveApp.getFoldersByName('dev_P_GP').next().getId());
}

function onOpen(e) {
  mainGP.init(e,null);
  mainGP.start();
}

function onInstall(e) {
  mainGP.init(e,null);
  mainGP.start();
}

function onEdit(e) {
  mainGP.init(e,null);
}

function onAddOnActivityMenu() {
  AddOnMenuManagerGP.createActivitySidebar();
}

function onActivitySidebarHtml() {
}

var mainGP = new MainGPClass();

/**
 * mainGP Application
 */
function MainGPClass() {

  this.projectFolderId='';
  /**
   *
   * @type {Folder}
   */
  this.projectFolder=null;

  this.currentDoc = null;
  this.currentDocType = '';
  this.docApp = null;

  this.isInitialized = false;

  this.getCurrentDoc=function (){
    if (this.currentDoc) {
      return this.currentDoc;
    }

    this.currentDoc = SpreadsheetApp.getActiveSpreadsheet();
    if (!this.currentDoc) {
      this.currentDoc = DocumentApp.getActiveDocument();
    }

    this.currentDocType = this.currentDoc.toString();

    return this.currentDoc;
  };

  /**
   *
   * @param e {EventObject}
   * @param context {ContextGPClass}
   */
  this.init = function (e,context) {
    if (this.isInitialized) {
      return;
    }
    this.isInitialized = true;

    //initProject
    //init from webapps
    if (context) {
      this.projectFolderId=context.projectFolderId;
      this.projectFolder=DriveApp.getFolderById(this.projectFolderId);
    }
    //from add on
    else {
      this.getCurrentDoc();
      this.projectFolder=FilesManagerGP.getProjectFolderFromFile(this.currentDoc);
      this.projectFolderId=this.projectFolder.getId();
    }

    if (this.currentDocType === ConstantsGP.FileTypes.SPREADSHEET) {
      this.docApp = SpreadsheetApp;
    }
    if (this.currentDocType === ConstantsGP.FileTypes.DOCUMENT) {
      this.docApp = DocumentApp;
    }
  };

  this.start = function () {
    AddOnMenuManagerGP.createActivityMenuGP();

    if (this.currentDocType() === ConstantsGP.FileTypes.DOCUMENT) {
      AddOnMenuManagerGP.createActivityMenuGP();
    }

    AddOnMenuManagerGP.createMenusGP();
  };
}

function ContextGPClass() {
  this.projectFolderId = '';
};
