function instasetupVM(playset) {

  var self = this;

  self.playsetVM = ko.observable(playset);
  self.truc = "bidule";

  /* First section of the Insta-Setup */
  self.firstSection = ko.observable(playset.sections()[0]);
  self.firstSectionChoice1 = ko.observable(self.firstSection().details()[0]);
  self.firstSectionChoice2 = ko.observable(self.firstSection().details()[6]);
  self.firstSectionChoice3 = ko.observable(self.firstSection().details()[12]);
  self.firstSectionChoice4 = ko.observable(self.firstSection().details()[18]);
  self.firstSectionChoice5 = ko.observable(self.firstSection().details()[24]);

  /* Second section of the Insta-Setup */
  self.secondSection = ko.observable(playset.sections()[1]);
  self.secondSectionChoice1 = ko.observable(self.secondSection().details()[0]);
  self.secondSectionChoice2 = ko.observable(self.secondSection().details()[6]);

  /* Third section of the Insta-Setup */
  self.thirdSection = ko.observable(playset.sections()[2]);
  self.thirdSectionChoice1 = ko.observable(self.thirdSection().details()[0]);
  self.thirdSectionChoice2 = ko.observable(self.thirdSection().details()[6]);

  /* Fourth section of the Insta-Setup */
  self.fourthSection = ko.observable(playset.sections()[3]);
  self.fourthSectionChoice1 = ko.observable(self.fourthSection().details()[0]);

  /*************/
  /* Functions */
  /*************/

  /* Randomizing (the sections aren't randomized )*/
  self.randomize = function() {
    // Choices of the first section
    var index = Math.floor((Math.random() * self.firstSection().details().length));
    self.firstSectionChoice1(self.firstSection().details()[index]);
    index = Math.floor((Math.random() * self.firstSection().details().length));
    self.firstSectionChoice2(self.firstSection().details()[index]);
    index = Math.floor((Math.random() * self.firstSection().details().length));
    self.firstSectionChoice3(self.firstSection().details()[index]);
    index = Math.floor((Math.random() * self.firstSection().details().length));
    self.firstSectionChoice4(self.firstSection().details()[index]);
    index = Math.floor((Math.random() * self.firstSection().details().length));
    self.firstSectionChoice5(self.firstSection().details()[index]);

    // Choices of the second section
    index = Math.floor((Math.random() * self.secondSection().details().length));
    self.secondSectionChoice1(self.secondSection().details()[index]);
    index = Math.floor((Math.random() * self.secondSection().details().length));
    self.secondSectionChoice2(self.secondSection().details()[index]);

    // Choices of the third section
    index = Math.floor((Math.random() * self.thirdSection().details().length));
    self.thirdSectionChoice1(self.thirdSection().details()[index]);
    index = Math.floor((Math.random() * self.thirdSection().details().length));
    self.thirdSectionChoice2(self.thirdSection().details()[index]);

    // Choice of the fourth section
    index = Math.floor((Math.random() * self.fourthSection().details().length));
    self.fourthSectionChoice1(self.fourthSection().details()[index]);

  }

  /* Returns the Insta-Setup indexes to be saved in the Json file */
  self.toJson = function() {
    var jsonIS = { };
    // Sections
    jsonIS.section1 = self.firstSection().number();
    jsonIS.section2 = self.secondSection().number();
    jsonIS.section3 = self.thirdSection().number();
    jsonIS.section4 = self.fourthSection().number();
    // Elements of first section
    jsonIS.section1Choice1 = self.itemToJson(self.firstSectionChoice1());
    jsonIS.section1Choice2 = self.itemToJson(self.firstSectionChoice2());
    jsonIS.section1Choice3 = self.itemToJson(self.firstSectionChoice3());
    jsonIS.section1Choice4 = self.itemToJson(self.firstSectionChoice4());
    jsonIS.section1Choice5 = self.itemToJson(self.firstSectionChoice5());
    // Elements of second section
    jsonIS.section2Choice1 = self.itemToJson(self.secondSectionChoice1());
    jsonIS.section2Choice2 = self.itemToJson(self.secondSectionChoice2());
    // Elements of third section
    jsonIS.section3Choice1 = self.itemToJson(self.thirdSectionChoice1());
    jsonIS.section3Choice2 = self.itemToJson(self.thirdSectionChoice2());
    // Elements of second section
    jsonIS.section4Choice1 = self.itemToJson(self.fourthSectionChoice1());

    return jsonIS;
  }
  self.itemToJson = function(item) {
    return { 'number': item.number(), 'category': item.categoryVM().number() };
  }

  self.fromJson = function(json) {
    if (json != null) {
      if (json.section1 != null) {
        self.firstSection(self.playsetVM().getSectionByNumber(json.section1));
        if (self.firstSection() != null) {
          self.firstSectionChoice1(self.firstSection().getItemFromJson(json.section1Choice1));
          self.firstSectionChoice2(self.firstSection().getItemFromJson(json.section1Choice2));
          self.firstSectionChoice3(self.firstSection().getItemFromJson(json.section1Choice3));
          self.firstSectionChoice4(self.firstSection().getItemFromJson(json.section1Choice4));
          self.firstSectionChoice5(self.firstSection().getItemFromJson(json.section1Choice5));
        }
      }
      if (json.section2 != null) {
        self.secondSection(self.playsetVM().getSectionByNumber(json.section2));
        if (self.secondSection() != null) {
          self.secondSectionChoice1(self.secondSection().getItemFromJson(json.section2Choice1));
          self.secondSectionChoice2(self.secondSection().getItemFromJson(json.section2Choice2));
        }
      }
      if (json.section3 != null) {
        self.thirdSection(self.playsetVM().getSectionByNumber(json.section3));
        if (self.thirdSection() != null) {
          self.thirdSectionChoice1(self.thirdSection().getItemFromJson(json.section3Choice1));
          self.thirdSectionChoice2(self.thirdSection().getItemFromJson(json.section3Choice2));
        }
      }
      if (json.section4 != null) {
        self.fourthSection(self.playsetVM().getSectionByNumber(json.section4));
        if (self.fourthSection() != null) {
          self.fourthSectionChoice1(self.fourthSection().getItemFromJson(json.section4Choice1));
        }
      }
    }
  }
}
