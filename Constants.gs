var Constants = {
  SPREADSHEET_TYPE : 'Spreadsheet',
  DOCUMENT_TYPE : 'Document',
  FILE_TYPE : 'File',

  EventFuncs : {
    ON_OPEN : 'onOpen',
    ON_INSTALL : 'onInstall',
    ON_EDIT : 'onEdit',
    ON_ADDON_INSTALL_MENU : 'onAddOnInstallMenu',
  },

  GPFileTypes : {
    // file is not a part of a GP project
    NONE : 'none',
    GP : 'GP',
    STUDENTS_GP : 'Students_GP',
    CONFIG_GP : 'Config_GP',
    ACTIVITY_GP : 'Activities_GP'
  },

  GPFileSuffixs : {
    DEFAULT : '_GP',
    PROJECT : '_P_GP'
  }
}