function instasetupVM(playset) {

  self.playsetVM = ko.observable(playset);

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
}
