/**
 * -------------- google events
 */

function onOpen(e) {
  Logger.log("main open :" + e.authMode);
  Main.init(e);
  if (Main.authMode != ScriptApp.AuthMode.FULL) {
    AddOnMenuManager.createInstallMenu();
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
function onAddOnInstallMenu(e) {
  Logger.log('onAddOnInstallMenu : '+e);
  //TriggersManager.installFile(this.currentFile);
}

/**
 * Main Application
 */
var Main = {
  authMode : null,
  currentFile:null,
  currentFileType : null,

  init : function(e) {
    this.authMode = e.authMode;
    this.currentFile = e.source;
    this.currentFileType = e.source.toString();
  }
}