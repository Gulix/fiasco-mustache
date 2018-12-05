function languageManager() {
  var self = this;

  self.lngKey = ko.observable("en");
  self.dictionaries = [];

  self.addDictionary = function(key, data) {
    self.dictionaries[key] = data;
  }

  self.current = ko.pureComputed(function() {
    return self.dictionaries[self.lngKey()];
  });

  self.languages = function() {
    var lngs = [];
    lngs.push({ key: "en", label: "English" });
    lngs.push({ key: "fr", label: "Français" });
    return lngs;
  }

  /*******************/
  /*** Insta-Setup ***/
  self.instasetup_title = ko.pureComputed(function() {
    return self.dictionaries[self.lngKey()].instasetup_title;
  });
  /*******************/
}

langManager = new languageManager();
