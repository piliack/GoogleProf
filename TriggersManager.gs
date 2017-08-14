/**
 * 
 */
var TriggersManager = {
  installAll : function() {
  },

  /**
   * @function installFile
   * @param {SpreadSheet
   *          or Document}
   * @param {boolean}
   *          dontVerifyOtherTriggers
   */
  installFile : function(file, dontVerifyOtherTriggers) {
    var haveOnOpen = false;
    var haveOnEdit = false;

    // verify installed trigger if authorization ok
    if (Main.authMode == ScriptApp.AuthMode.FULL && !dontVerifyOtherTriggers) {
      var triggers = ScriptApp.getUserTriggers(file);
      
      for (var i = 0, l = triggers.length; i < l; i++) {
        if (file.getId() == triggers[i].getTriggerSourceId()) {
          if (triggers[i].getEventType() == Constants.ON_OPEN) {
            haveOnOpen = true;
          }
          if (triggers[i].getEventType() == Constants.ON_EDIT) {
            haveOnEdit = true;
          }
        }
      }
    }

    // add instable triggers for spreadsheet
    if (file.toString() == Constants.SPREADSHEET_TYPE) {
      if (!haveOnOpen) {
        try {
          ScriptApp.newTrigger(Constants.FunctionEvents.ON_OPEN)
              .forSpreadsheet(file).onOpen().create();
        } catch (e) {
        }
      }
      if (!haveOnEdit) {
        try {
          ScriptApp.newTrigger(Constants.FunctionEvents.ON_EDIT)
              .forSpreadsheet(file).onEdit().create();
        } catch (e) {
        }
      }
    }

    // add instable trigger for document
    if (file.toString() == Constants.DOCUMENT_TYPE) {
      if (!haveOnOpen) {
        try {
          ScriptApp.newTrigger(Constants.FunctionEvents.ON_OPEN).forDocument(
              file).onOpen().create();
        } catch (e) {
        }
      }
    }
  }
}