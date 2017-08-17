/**
 * manage all DriveApp files
 */
var FilesManager = {

  /**
   * need auth FULL
   */
  getGPFileType: function (file) {

    if (file.toString() === Constants.SPREADSHEET_TYPE
      || file.toString() === Constants.DOCUMENT_TYPE) {
      file = DriveApp.getFileById(file.getId());
    }

    // parse all folders parents to find a GP project root folder
    var isGPRootFolderFound = false, folders = null, parentFolder = null, parentFolderName = null;
    do {
      folders = file.getParents();
      parentFolder = folders.hasNext() ? folders.next() : null;
      Logger.log('parent folder :' + parentFolder);
      if (parentFolder) {        
        parentFolderName = parentFolder.getName();
        isGPRootFolderFound = (parentFolderName.substring(
          parentFolderName.length - Constants.GPFileSuffixs.PROJECT.length,
          parentFolderName.length) === Constants.GPFileSuffixs.PROJECT);
      }

    } while (parentFolder && !isGPRootFolderFound);

    //if the file is not a part of a GP project => stop here, the type is know
    if (!isGPRootFolderFound) {
      return Constants.GPFileTypes.NONE;
    }


  }
};