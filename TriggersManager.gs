/**
 * 
 */
var TriggersManager = {

  /**
   * install instalables triggers for all the project files with _GP suffix
   * 
   * @func
   * 
   */
  installProject : function() {
    if (Main.authMode != ScriptApp.AuthMode.FULL) {
      return;
    }

  },

  /**
   * tool for install triggers on one file
   * 
   * @function installFile
   * @param {SpreadSheet
   *          or Document}
   * @param {boolean}
   *          dontVerifyOtherTriggers
   */
  installFile : function(file, dontVerifyOtherTriggers) {
    var haveOnOpen = false;
    var haveOnEdit = false;
    var onOpenInstalled = false;

    // verify installed trigger if authorization ok
    if (Main.authMode == ScriptApp.AuthMode.FULL && !dontVerifyOtherTriggers) {
      var triggers = ScriptApp.getUserTriggers(file);

      for (var i = 0, l = triggers.length; i < l; i++) {
        if (file.getId() == triggers[i].getTriggerSourceId()) {
          if (triggers[i].getEventType() == ScriptApp.EventType.ON_OPEN) {
            haveOnOpen = true;
          }
          if (triggers[i].getEventType() == ScriptApp.EventType.ON_EDIT) {
            haveOnEdit = true;
          }
        }
      }
    }

    // add instable triggers for spreadsheet
    if (file.toString() == Constants.SPREADSHEET_TYPE) {
      if (!haveOnOpen) {
        try {
          ScriptApp.newTrigger(Constants.ON_OPEN_FUNC).forSpreadsheet(file)
              .onOpen().create();
          onOpenInstalled = true;
        } catch (e) {
        }
      }
      if (!haveOnEdit) {
        try {
          ScriptApp.newTrigger(Constants.ON_EDIT_FUNC).forSpreadsheet(file)
              .onEdit().create();
        } catch (e) {
        }
      }
    }

    // add instable trigger for document
    if (file.toString() == Constants.DOCUMENT_TYPE) {
      if (!haveOnOpen) {
        try {
          ScriptApp.newTrigger(Constants.ON_OPEN_FUNC).forDocument(file)
              .onOpen().create();
          onOpenInstalled = true;
        } catch (e) {
        }
      }
    }

    return (onOpenInstalled || haveOnOpen);

  }
}