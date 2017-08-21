var DebugGP={
  init:function() {
    mainGP.init(null, new ContextGPClass(DriveApp.getFoldersByName('dev_P_GP').next().getId()));
  }
};

function debugGetProjectFileByName() {
  DebugGP.init();
  var file=FilesManagerGP.getProjectFileByName("Skills_GP");
  if (file) {
    mainGP.log('debugGetProjectFileByName Skills_GP : '+file.getName());
  }
  else {
    mainGP.log('debugGetProjectFileByName fail ');
  }
}