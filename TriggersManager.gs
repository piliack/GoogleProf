/**
 * 
 */
var TriggersManager = {

  installProject : function() {
    if (Main.authMode !== ScriptApp.AuthMode.FULL) {

    }

  },

  installDoc : function(doc) {
    var haveOnOpen = false;
    var haveOnEdit = false;
    var onOpenInstalled = false;

    // verify installed trigger if authorization ok
    if (Main.authMode === ScriptApp.AuthMode.FULL) {
      var triggers = [];
        try {
            ScriptApp.getUserTriggers(doc)
        } catch (er) {
            Logger.log('install doc getusertrigger erro :' + er.message)
        }
        for (var i = 0, l = triggers.length; i < l; i++) {
        if (doc.getId() === triggers[i].getTriggerSourceId()) {
          if (triggers[i].getEventType() === ScriptApp.EventType.ON_OPEN) {
            haveOnOpen = true;
          }
          if (triggers[i].getEventType() === ScriptApp.EventType.ON_EDIT) {
            haveOnEdit = true;
          }
        }
      }
    }

    // add instable triggers for spreadsheet
    if (doc.toString() === Constants.SPREADSHEET_TYPE) {
      if (!haveOnOpen) {
        try {
          ScriptApp.newTrigger(Constants.EventFuncs.ON_OPEN).forSpreadsheet(doc)
              .onOpen().create();
          onOpenInstalled = true;
        } catch (e) {
        }
      }
      if (!haveOnEdit) {
        try {
          ScriptApp.newTrigger(Constants.EventFuncs.ON_EDIT).forSpreadsheet(doc)
              .onEdit().create();
        } catch (e) {
        }
      }
    }

    // add instable trigger for document
    if (doc.toString() === Constants.DOCUMENT_TYPE) {
      if (!haveOnOpen) {
        try {
          ScriptApp.newTrigger(Constants.EventFuncs.ON_OPEN).forDocument(doc)
              .onOpen().create();
          onOpenInstalled = true;
        } catch (e) {
        }
      }
    }

    return (onOpenInstalled || haveOnOpen);

  }
};