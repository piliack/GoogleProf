/**
 * manage all DriveApp files
 */
var FilesManager = {

  /**
   *
   * @param file {FileFunc}
   * @returns {string}
   */
  getGPFileType: function (file) {

    if (file.toString() === Constants.FileTypes.SPREADSHEET
      || file.toString() === Constants.FileTypes.DOCUMENT) {
      file = DriveApp.getFileById(file.getId());
    }
    /**
     *
     * @type {FileFunc}
     */
    var folder = file;
    var parentsFoldersNames = [];

    // parse all folders parents to find a GP project root folder
    var isGPRootFolderFound = false, folders = null, parentFolder = null, parentFolderName = null;

    do {
      folders = folder.getParents();
      parentFolder = folders.hasNext() ? folders.next() : null;
      if (parentFolder) {
        parentFolderName = parentFolder.getName();
        parentsFoldersNames.push(parentFolderName);
        isGPRootFolderFound = (parentFolderName.substring(
          parentFolderName.length - Constants.GPFileSuffixs.PROJECT.length,
          parentFolderName.length) === Constants.GPFileSuffixs.PROJECT);
      }
      folder = parentFolder;
    } while (parentFolder && !isGPRootFolderFound);


    //if the file is not a part of a GP project => stop here, the type is know
    if (!isGPRootFolderFound) {
      return Constants.GPFileTypes.NONE;
    }

    /**
     * @type {string}
     */
    var fileName = file.getName();

    if (filName === Constants.GPFileTypes.CONFIG_GP) {
      return Constants.GPFileTypes.CONFIG_GP;
    }

    if (filName === Constants.GPFileTypes.STUDENTS_GP) {
      return Constants.GPFileTypes.STUDENTS_GP;
    }

    if (filName === Constants.GPFileTypes.SKILLS_GP) {
      return Constants.GPFileTypes.SKILLS_GP;
    }

    if (parentsFoldersNames.indexOf(Constants.GPFileTypes.ACTIVITY_GP) > -1) {
      return Constants.GPFileTypes.ACTIVITY_GP;
    }

  }
};