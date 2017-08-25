var ConstantsGP = {
  FileTypes: {
    SPREADSHEET: 'Spreadsheet',
    DOCUMENT: 'Document',
    FILE: 'File',
    FOLDER: 'Folder'
  },

  EventFuncs: {
    ON_OPEN: 'onOpen',
    ON_INSTALL: 'onInstall',
    ON_EDIT: 'onEdit',
    ON_ADDON_ACTIVITY_MENU: 'onAddOnActivityMenu'
  },

  GPFileTypes: {
    // file is not a part of a GP project
    NONE: 'none',
    GP: 'GP',
    STUDENTS_GP: 'Students_GP',
    CONFIG_GP: 'Config_GP',
    SKILLS_GP: 'Skills_GP',
    ACTIVITY_GP: 'Activities_GP'
  },

  GPSuffixs: {
    DEFAULT: '_GP',
    PROJECT_FOLDER: '_P_GP',
    //in Skills_GP file -> SO_P1_GP:LABEL
    SKILLS_TYPE_SEPARATOR: ':',
    SKILLS_ID_SEPARATOR: '_',
    SKILLS_TYPES: {LABEL: 'LABEL', CODES: 'CODES', VALUES: 'VALUES'},
    STUDENTS_SHEET_DISTRIB:'_DISTRIB_GP',
    STUDENTS_SHEET_STUDENTS_GP:'STUDENTS_GP'
  },

  Date:{
    DATE_FORMAT_IN_SHEET:'dd/m/yyyy',
    DATE_TIME_FORMAT_IN_SHEET:'d/m/yyyy hh:mm',
    TIME_FORMAT_IN_SHEET:'h:mm',
  },

  StudentsVars: {
    IDS_GP:'IDS_GP',
    FIRSTNAMES_GP:'FIRSTNAMES_GP',
    LASTNAMES_GP:'LASTNAMES_GP',
    LEVELS_GP:'LEVELS_GP',
    BIRTHDAYS_GP:'BIRTHDAYS_GP',
  },

  PlanningVars:{
    START_DATE_GP:'START_DATE_GP',
    END_DATE_GP:'END_DATE_GP',
    DISTRIB_GP:'DISTRIB_GP',
    REPETITION_GP:'REPETITION_GP',
    TYPE_GP:'TYPE_GP',
    DETAILS_GP:'DETAILS_GP',
    COLOR_GP:'COLOR_GP'
  },

  PlanningColVars:{
    ACTIVITIES_GP:'ACTIVITIES_GP',
    TIMESLOTS_STARTS_GP:'TIMESLOTS_STARTS_GP',
    TIMESLOTS_ENDS_GP:'TIMESLOTS_ENDS_GP',
    WEEKDAYS_GP:'WEEKDAYS_GP'
  },

  HtmlFiles: {
    ACTIVITY_SIDEBAR: 'ActivitySideBar'
  }
};