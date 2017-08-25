/**
 * manage all DriveApp files
 */
var FilesManagerGP = {

  /**
   *
   * @param file {(FileFunc|SpreadsheetFunc|DocumentFunc)}
   * @return {*}
   */
  testGPFile: function (file) {
    return UtilsGP.testSuffix(file.getName(),ConstantsGP.GPSuffixs.DEFAULT);
  },

  //get a file by name in the current project
  /**
   *
   * @param name {string}
   * @return {FileFunc}
   */
  getProjectFileByName: function (name) {

    return recurrentFunc(mainGP.projectFolder, name);

    /** @param folder {FolderFunc}
     *  @param name {string}
     * */
    function recurrentFunc(folder, name) {
      //parse all files, return file if same name
      /** @type {FileIteratorFunc}*/
      var files = folder.getFiles();
      /** @type {FileFunc}*/
      var file = null;
      while (files.hasNext()) {
        file = files.next();
        if (file.getName() === name) {
          return file;
        }
      }
      ;

      //parse all folder
      var folders = folder.getFolders();
      /** @type {FolderFunc}*/
      var parsedFolder = null;
      while (folders.hasNext()) {
        parsedFolder = folders.next();
        file = recurrentFunc(parsedFolder, name);
        if (file) {
          return file;
        }
      }

      return null;
    }
  },

  getProjectFolderFromFile: function (file) {
    var folder = file;

    // parse all folders parents to find a GP project root folder
    var isGPRootFolderFound = false, folders = null, parentFolder = null, parentFolderName = null;

    do {
      folders = folder.getParents();
      parentFolder = folders.hasNext() ? folders.next() : null;
      if (parentFolder) {
        parentFolderName = parentFolder.getName();
        isGPRootFolderFound = UtilsGP.testSuffix(parentFolderName, ConstantsGP.GPSuffixs.PROJECT_FOLDER);
      }
      folder = parentFolder;
    } while (parentFolder && !isGPRootFolderFound);

    if (isGPRootFolderFound) {
      return parentFolder;
    }

    return null;
  },

  /**
   *
   * @param file {Object}
   * @returns {string}
   */
  /*getGPFileType: function (file) {

    if (file.toString() === ConstantsGP.FileTypes.SPREADSHEET
      || file.toString() === ConstantsGP.FileTypes.DOCUMENT) {
      file = DriveApp.getFileById(file.getId());
    }

    var projectFolder = this.getProjectFolderFromFile(file);

    //if the file is not a part of a GP project => stop here, the type is know
    if (!projectFolder) {
      return ConstantsGP.GPFileTypes.NONE;
    }

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

    if (UtilsGP.testSuffix(fileName, ConstantsGP.GPSuffixs.ACTIVITY_FILE)) {
      return ConstantsGP.GPFileTypes.ACTIVITY_GP;
    }

    return ConstantsGP.GPFileTypes.GP;
  }*/
};