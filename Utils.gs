var UtilsGP={
  testSuffix:function (text, suffix) {
    return (text.substring(text.length - suffix.length, text.length) === suffix);
  }
};