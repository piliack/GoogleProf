/**
 * manage all DriveApp files
 */
var FilesManager = {

  /**
   * need auth FULL
   */
  getGPFileType : function(file) {
    if (file.toString() == Constants.SPREADSHEET_TYPE
        || file.toString() == Constants.DOCUMENT_TYPE) {
      file = DriveApp.getFileById(file.getId());
    }

    var folders = file.getParents;
    while (folders.hasNext()) {
      var folder = folders.next();
      Logger.log('getGPFileType folder' + folder.getName());
    }
  }
}