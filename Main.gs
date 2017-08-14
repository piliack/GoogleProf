/**
 * -------------- google events
 */

function onOpen(e) {
  Main.onOpen(e);
}

function onInstall(e) {
  Main.onInstall(e);
}

var Main={
    onInstall:function(e) {
      
    },
    
    onOpen:function(e) {
      //not all authorization => install it
      Logger.log("main open :"+ScriptApp.AuthMode);
      Logger.log(TriggersManager);
      Logger.log(TriggersManager.installFile);
      if (ScriptApp.AuthMode!=ScriptApp.AuthMode.FULL) {
        TriggersManager.installFile(e.source)
      }
    }
}