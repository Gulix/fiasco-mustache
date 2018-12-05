/**************************************/
/* Managing the DataStorage functions */
/**************************************/
  function isDataStorageActive() {
    return typeof(Storage) !== "undefined";
  }

  function getStoredString(key) {
    if (isDataStorageActive()) {
      var data = localStorage.getItem(key);
      return data;
    } else {
      return null;
    }
  }

  function storeString(key, valueString) {
    if (isDataStorageActive()) {
      localStorage.setItem(key, valueString);
    }
}
