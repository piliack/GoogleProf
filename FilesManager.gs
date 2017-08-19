/**
 * manage all DriveApp files
 */
var FilesManagerGP = {

  getGPFileByType: function (type) {

  },

  getProjectFolderFromFile:function(file) {
    //TODO
  },

  /**
   *
   * @param file {Object}
   * @returns {string}
   */
  getGPFileType: function (file) {

    if (file.toString() === ConstantsGP.FileTypes.SPREADSHEET
      || file.toString() === ConstantsGP.FileTypes.DOCUMENT) {
      file = DriveApp.getFileById(file.getId());
    }

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
          parentFolderName.length - ConstantsGP.GPFileSuffixs.PROJECT.length,
          parentFolderName.length) === ConstantsGP.GPFileSuffixs.PROJECT);
      }
      folder = parentFolder;
    } while (parentFolder && !isGPRootFolderFound);


    //if the file is not a part of a GP project => stop here, the type is know
    if (!isGPRootFolderFound) {
      return ConstantsGP.GPFileTypes.NONE;
    }

    /**
     * @type {string}
     */
    var fileName = file.getName();

    if (fileName === ConstantsGP.GPFileTypes.CONFIG_GP) {
      return ConstantsGP.GPFileTypes.CONFIG_GP;
    }

    if (fileName === ConstantsGP.GPFileTypes.STUDENTS_GP) {
      return ConstantsGP.GPFileTypes.STUDENTS_GP;
    }

    if (fileName === ConstantsGP.GPFileTypes.SKILLS_GP) {
      return ConstantsGP.GPFileTypes.SKILLS_GP;
    }

    if (parentsFoldersNames.indexOf(ConstantsGP.GPFileTypes.ACTIVITY_GP) > -1) {
      return ConstantsGP.GPFileTypes.ACTIVITY_GP;
    }

    return ConstantsGP.GPFileTypes.GP;
  }
};