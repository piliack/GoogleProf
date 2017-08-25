/**
 * -------------- GOOGLE EVENTS
 */

function onOpen(e) {
  mainGP.init();
  mainGP.start();
}

function onInstall(e) {
  mainGP.init();
  mainGP.start();
}

function onEdit(e) {
  mainGP.init();
}

function onAddOnActivityMenu() {
  mainGP.init();

  AddOnMenuManagerGP.createActivitySidebar();
}

function onActivitySidebarHtml() {

}

function onAddOnPlanningGenerateBySheet() {
  mainGP.init();
}

function onAddOnPlanningGenerateBySpreadsheet() {
  mainGP.init();
}

function onAddOnPlanningDeleteBySheet() {
  mainGP.init();
}

function onAddOnPlanningDeleteBySpreadsheet() {
  mainGP.init();
}

var mainGP = new MainGPClass();

/**
 * mainGP Application
 */
function MainGPClass() {

  this.debugMode=true;

  this.projectFolderId = '';
  /**
   *
   * @type {Folder}
   */
  this.projectFolder = null;

  this.currentDoc = null;
  this.currentDocType = '';
  this.docApp = null;

  this.log=function(data) {
    Logger.log(data);
  };

  this.getCurrentDoc = function () {
    if (this.currentDoc) {
      return this.currentDoc;
    }

    this.currentDoc = SpreadsheetApp.getActiveSpreadsheet();
    if (!this.currentDoc) {
      this.currentDoc = DocumentApp.getActiveDocument();
    }

    if (this.currentDoc) {
      this.currentDocType = this.currentDoc.toString();
    }

    return this.currentDoc;
  };

  /**
   *
   * @param [context] {ContextGPClass}
   */
  this.init = function (context) {
    //initProject
    //init from webapps
    if (context) {
      this.projectFolderId = context.projectFolderId;
      this.projectFolder = DriveApp.getFolderById(this.projectFolderId);
    }
    //from add on
    else {
      this.getCurrentDoc();
      this.projectFolder = FilesManagerGP.getProjectFolderFromFile(this.currentDoc);
      this.projectFolderId = this.projectFolder.getId();
    }

    if (this.currentDocType === ConstantsGP.FileTypes.SPREADSHEET) {
      this.docApp = SpreadsheetApp;
    }
    if (this.currentDocType === ConstantsGP.FileTypes.DOCUMENT) {
      this.docApp = DocumentApp;
    }
  };

  this.start = function () {
    AddOnMenuManagerGP.createMenusGP();
  };

  this.callPlanningOnFile=function(func) {
    this.init();

    if (!FilesManagerGP.testGPFile(this.currentDoc)) {
      //AddOnMenuManagerGP.createMessageSidebar();
      return;
    }

    var result=PlanningManagerGP['func']
  }
}

/**
 *
 * @param projectFolderId {string}
 * @constructor
 */
function ContextGPClass(projectFolderId) {
  /**
   *
   * @type {string}
   */
  this.projectFolderId = projectFolderId;
};
