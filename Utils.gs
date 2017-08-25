var UtilsGP = {
  testSuffix: function (text, suffix) {
    return (text.substring(text.length - suffix.length, text.length) === suffix);
  },

  /**
   * @param text {string}
   * @param suffix {string}
   * @param [isStrict} {boolean} - if text have no suffix. in strict mode => return '' else return text
   * @return {string} -  first part.
   * ex: for DEV_GP with _GP suffix return DEV
   */
  getFirstPartSuffixed: function (text, suffix, isStrict) {
    if (!text) {
    return text;
    }
    var arr = text.split(suffix);
    //split with suffix return first part and a second object empty
    if (arr.length !== 2 || arr[1]) {
      return isStrict ? '' : text;
    }

    return arr[0];
  },

  /**
   *
   * @param arr {Array.<Object>}
   * @param propertyName {string}
   * @param value {Object}
   * @return {Object}
   */
  IndexOfArrayOfObject: function (arr, propertyName, value) {
    for (var i = 0, l = arr.length; i < l; i++) {
      if (arr[i][propertyName] === value) {
        return i;
      }
    }

    return -1;
  },

  /**
   *
   * @param array {Array.<Array.<Object>>}
   */
  inverse2DArray: function (array) {
    var newArray = [];
    for (var i = 0, l = array.length; i < l; i++) {
      for (var j = 0, m = array[i].length; j < m; j++) {
        if (!newArray[j]) {
          newArray[j] = [];
        }
        newArray[j][i] = array[i][j];
      }
    }

    return newArray;
  },


};

