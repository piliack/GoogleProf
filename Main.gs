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
  mainGP.callPlanningOnFile(PlanningManagerGP.generateBySheet);
}

function onAddOnPlanningGenerateBySpreadsheet() {
  mainGP.callPlanningOnFile(PlanningManagerGP.generateBySpreadSheet);
}

function onAddOnPlanningDeleteBySheet() {
  mainGP.callPlanningOnFile(PlanningManagerGP.deleteBySheet);
}

function onAddOnPlanningDeleteBySpreadsheet() {
  mainGP.callPlanningOnFile(PlanningManagerGP.deleteBySpreadSheet);
}

var mainGP = new MainGPClass();

/**
 * mainGP Application
 */
function MainGPClass() {

  this.debugMode = true;

  this.projectFolderId = '';
  /** @type {Folder}*/
  this.projectFolder = null;
  /** @type {(DocumentFunc|SpreadsheetFunc)}*/
  this.currentDoc = null;
  this.currentDocType = '';
  /** @type {(DocumentAppFunc|SpreadsheetAppFunc)}*/
  this.docApp = null;

  this.log = function (data) {
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

  /**
   *
   * @param func {Function}
   */
  this.callPlanningOnFile = function (func) {
    this.init();

    if (!FilesManagerGP.testGPFile(this.currentDoc) || this.currentDocType !== ConstantsGP.FileTypes.SPREADSHEET) {
      AddOnMenuManagerGP.createMessageSidebar(
        LabelsToTranslateGP.getLabel(LabelsToTranslateGP.ERROR_TITLE),
        LabelsToTranslateGP.getLabel(LabelsToTranslateGP.PLANNING_ERROR_FILE, ConstantsGP.GPSuffixs.DEFAULT, ConstantsGP.GPFileTypes.PLANNINGS_FOLDER_GP)
      );
      return;
    }

    var result = func(mainGP.currentDoc.getActiveSheet());

    AddOnMenuManagerGP.createMessageSidebar(
      LabelsToTranslateGP.getLabel(LabelsToTranslateGP.MENU_PLANNING),
      LabelsToTranslateGP.getLabel(result ? LabelsToTranslateGP.OPERATION_SUCCESS : LabelsToTranslateGP.PROBLEM_OCCURRED)
    );
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
