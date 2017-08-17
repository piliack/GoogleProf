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

    var folder=file;

    // parse all folders parents to find a GP project root folder
    var isGPRootFolderFound = false, folders = null, parentFolder = null, parentFolderName = null;
    do {
      folders = folder.getParents();
      parentFolder = folders.hasNext() ? folders.next() : null;
      if (parentFolder) {
        parentFolderName = parentFolder.getName();
        isGPRootFolderFound = (parentFolderName.substring(
          parentFolderName.length - Constants.GPFileSuffixs.PROJECT.length,
          parentFolderName.length) === Constants.GPFileSuffixs.PROJECT);
      }
      folder=parentFolder;
    } while (parentFolder && !isGPRootFolderFound);


    //if the file is not a part of a GP project => stop here, the type is know
    if (!isGPRootFolderFound) {
      return Constants.GPFileTypes.NONE;
    }


  }
};