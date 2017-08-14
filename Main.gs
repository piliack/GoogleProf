/**
 * -------------- google events
 */

function onOpen(e) {
  Main.onOpen(e);
}

function onInstall(e) {
  Main.onInstall(e);
}

function onEdit(e) {
  Main.onEdit(e);
}

var Main = {
  authMode:'',

  init:function(e) {
    this.authMode=e.authMode;
  },

  onInstall : function(e) {
    this.init(e);
  },

  onOpen : function(e) {
    this.init(e);
  
    // not all authorization => install it
    Logger.log("main open :" + ScriptApp.AuthMode+','+e.authMode+','+ScriptApp.AuthorizationStatus);
    //if (ScriptApp.AuthMode != ScriptApp.AuthMode.FULL) {
      TriggersManager.installFile(e.source);
    //}
  },
  
  onEdit:function(e){
    this.init(e);
  }
}