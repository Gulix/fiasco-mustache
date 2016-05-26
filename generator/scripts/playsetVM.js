function playsetVM() {

  var self = this;

  /* Introduction Section - Description of Playset */
  self.playsetTitle = new ko.observable('Playset Title');
  self.playsetSubtitle = new ko.observable('Playset Sub-Title');
  self.playsetTeaser = new ko.observable('Playset Teaser');
  self.playsetDescription = new ko.observable('');
  self.playsetCredits = new ko.observable('Made via Fiasco-Mustache');

  /* Sections of Categories / Items */
  self.sections = new ko.observableArray([]);
  for(var iSection = 1; iSection <= 4; iSection++) {
    var section = new sectionVM('Section #' + iSection, iSection);
    self.sections.push(section);
  }

  /* Insta-Setup */
  self.instasetup = ko.observable(new instasetupVM(self));

  /**********************/
  /* Sections of the UI */
  /**********************/
  /* Displaying-Hiding sections */
  self.displayedSections = new ko.observableArray([]);
  self.displayedSections.push(new displayedSectionVM('Introduction', 'Intro', true));
  for(var iSection = 0; iSection < self.sections().length; iSection++) {
    self.displayedSections.push(self.sections()[iSection].displayedSection());
  }
  self.displayedSections.push(new displayedSectionVM('Insta-Setup', 'InstaSetup', false));
  self.displayedSections.push(new displayedSectionVM('Generator', 'Generator', false));
  self.displayedSections.push(new displayedSectionVM('About', 'About', false));

  /* Hide all the sections */
  self.hideSections = function() {
    for(var iDisplayedSection = 0; iDisplayedSection < self.displayedSections().length; iDisplayedSection++) {
      var displayedSection = self.displayedSections()[iDisplayedSection];
      displayedSection.isVisible(false);
    }
  }
  for(var iDisplayedSection = 0; iDisplayedSection < self.displayedSections().length; iDisplayedSection++) {
    var displayedSection = self.displayedSections()[iDisplayedSection];
    displayedSection.hideOthers = function() { self.hideSections(); }
  }
  /* Special Sections Visiblity */
  self.isSectionVisible = function(code) {
    for(var iDisplayedSection = 0; iDisplayedSection < self.displayedSections().length; iDisplayedSection++) {
      var displayedSection = self.displayedSections()[iDisplayedSection];
      if (displayedSection.code() == code) { return displayedSection.isVisible(); }
    }
    return false;
  }
  self.isIntroductionVisible = ko.pureComputed(function() { return self.isSectionVisible('Intro'); }, self);
  self.isInstaSetupVisible = ko.pureComputed(function() { return self.isSectionVisible('InstaSetup'); }, self);
  self.isGeneratorVisible = ko.pureComputed(function() { return self.isSectionVisible('Generator'); }, self);
  self.isAboutVisible = ko.pureComputed(function() { return self.isSectionVisible('About'); }, self);

  /*********************************/
  /* Loading from & Saving to Json */
  /*********************************/
  /* Open the "Select a File" window */
  self.loadPlayset = function() {
    $("#file-load").click();
  }
  self.savePlayset = function() {
    var blob = new Blob([JSON.stringify(get_json_fromPlaysetVM(self, false, false))], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "fiasco_template_" + self.playsetTitle() + ".json");
  }
  /* Process the loaded file into the ViewModel */
  self.updateFromJson = function(jsonData) {
    if (jsonData != undefined) {
      // General description
      self.playsetTitle(jsonData.title);
      self.playsetSubtitle(jsonData.subtitle);
      self.playsetTeaser(jsonData.teaser);
      if (jsonData.description != undefined) {
        self.playsetDescription(jsonData.description);
      } else { // Load old version of Playsets
        self.playsetDescription(get_oldDescription_toNewFormat(jsonData));
      }
      self.playsetCredits(jsonData.credits);

      // Sections / Categories / Details
      for(var iSection = 0; iSection < jsonData.sections.length; iSection++){
        var jsonSection = jsonData.sections[iSection];
        var sectionVM = self.sections()[iSection];
        sectionVM.titleValue(jsonSection.label);
        for(var iCategory = 0; iCategory < jsonSection.categories.length; iCategory++) {
          var jsonCategory = jsonSection.categories[iCategory];
          var categoryVM = sectionVM.categories()[iCategory];
          categoryVM.title(jsonCategory.label);
          for(var iDetail = 0; iDetail < jsonCategory.details.length; iDetail++) {
            var jsonDetail = jsonCategory.details[iDetail];
            var detailVM = categoryVM.items()[iDetail];
            detailVM.textValue(jsonDetail.label);
          }
        }
      }
    }
  };

}

function get_oldDescription_toNewFormat(jsonData)
{
  var migratedDescription = '';
  var blockSep = '';

  if (jsonData.hasOwnProperty("description") && (jsonData.description.length > 0))
  {
    migratedDescription += blockSep + jsonData.description;
    blockSep = '\n';
  }

  if (jsonData.hasOwnProperty("presentation") && (jsonData['presentation'].length > 0))
  {
    migratedDescription += blockSep + "# Presentation\n" + jsonData['presentation'];
    blockSep = '\n';
  }
  if (jsonData.hasOwnProperty("inspirations") && (jsonData['inspirations'].length > 0))
  {
    migratedDescription += blockSep + "# Inspirations\n" + jsonData['inspirations'];
    blockSep = '\n';
  }
  if (jsonData.hasOwnProperty("advices") && (jsonData['advices'].length > 0))
  {
    migratedDescription += blockSep + "# Advices\n" + jsonData['advices'];
    blockSep = '\n';
  }

  return migratedDescription;
}
